import config from '../config';
import { toast } from 'react-hot-toast';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const validateData = (data) => {
  if (data === null || data === undefined) return true;
  if (typeof data === 'object') {
    return Object.values(data).every(value => validateData(value));
  }
  return true;
};

const fetchWithTimeout = async (url, options, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new ApiError('La requête a expiré', 408);
    }
    throw error;
  }
};

const fetchWithRetry = async (url, options, retryCount = 0) => {
  try {
    const response = await fetchWithTimeout(url, options);
    const data = await response.json();

    if (response.status === 401) {
      localStorage.removeItem(config.TOKEN_KEY);
      window.location.href = '/login';
      throw new ApiError('Session expirée', 401);
    }

    if (!response.ok) {
      throw new ApiError(
        data.detail || 'Une erreur est survenue',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (retryCount < config.MAX_RETRY_ATTEMPTS && error.status >= 500) {
      await delay(config.RETRY_DELAY * (retryCount + 1));
      return fetchWithRetry(url, options, retryCount + 1);
    }
    throw error;
  }
};

const getHeaders = () => {
  const token = localStorage.getItem(config.TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const api = {
  async get(endpoint) {
    try {
      return await fetchWithRetry(
        `${config.API_BASE_URL}${endpoint}`,
        { headers: getHeaders() }
      );
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      if (!validateData(data)) {
        throw new ApiError('Données invalides', 400);
      }
      return await fetchWithRetry(
        `${config.API_BASE_URL}${endpoint}`,
        {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(data)
        }
      );
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  },

  async put(endpoint, data) {
    try {
      if (!validateData(data)) {
        throw new ApiError('Données invalides', 400);
      }
      return await fetchWithRetry(
        `${config.API_BASE_URL}${endpoint}`,
        {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(data)
        }
      );
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  },

  async delete(endpoint) {
    try {
      return await fetchWithRetry(
        `${config.API_BASE_URL}${endpoint}`,
        {
          method: 'DELETE',
          headers: getHeaders()
        }
      );
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
};

export default api; 