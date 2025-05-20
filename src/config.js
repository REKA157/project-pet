const ENV = import.meta.env.MODE || 'development';

const validateConfig = (config) => {
  const required = ['API_BASE_URL', 'WS_BASE_URL'];
  const missing = required.filter(key => !config[key]);
  
  if (missing.length > 0) {
    throw new Error(`Configuration manquante: ${missing.join(', ')}`);
  }
  
  return config;
};

const getEnvironmentConfig = () => {
  switch (ENV) {
    case 'production':
      return {
        API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
        WS_BASE_URL: import.meta.env.VITE_WS_BASE_URL,
      };
    case 'staging':
      return {
        API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://staging-api.project-pet.com',
        WS_BASE_URL: import.meta.env.VITE_WS_BASE_URL || 'wss://staging-ws.project-pet.com',
      };
    default:
      return {
        API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
        WS_BASE_URL: import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000',
      };
  }
};

const config = validateConfig({
  ...getEnvironmentConfig(),
  TOKEN_KEY: 'token',
  USER_EMAIL_KEY: 'userEmail',
  DEFAULT_LANGUAGE: 'fr-FR',
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  TOAST_DURATION: 4000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'audio/mpeg', 'audio/wav'],
  MAP_DEFAULT_ZOOM: 13,
  MAP_DEFAULT_CENTER: { lat: 48.8566, lng: 2.3522 }, // Paris
  ENV,
  IS_DEVELOPMENT: ENV === 'development',
  IS_PRODUCTION: ENV === 'production',
  IS_STAGING: ENV === 'staging',
});

export default config; 