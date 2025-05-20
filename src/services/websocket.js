import config from '../config';
import { toast } from 'react-hot-toast';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.listeners = new Map();
    this.connectionTimeout = null;
    this.messageQueue = [];
  }

  validateMessage(data) {
    return (
      data &&
      typeof data === 'object' &&
      typeof data.type === 'string' &&
      data.type.length > 0
    );
  }

  connect(userEmail) {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    const token = localStorage.getItem(config.TOKEN_KEY);
    if (!token) return;

    this.ws = new WebSocket(`${config.WS_BASE_URL}/ws/notifications/${userEmail}`);

    // Timeout de connexion
    this.connectionTimeout = setTimeout(() => {
      if (this.ws?.readyState !== WebSocket.OPEN) {
        this.ws?.close();
        toast.error('Timeout de connexion aux notifications');
      }
    }, 5000);

    this.ws.onopen = () => {
      clearTimeout(this.connectionTimeout);
      console.log('WebSocket connecté');
      this.reconnectAttempts = 0;
      this.ws.send(JSON.stringify({ type: 'auth', token }));
      
      // Envoyer les messages en attente
      while (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift();
        this.send(message);
      }
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (this.validateMessage(data)) {
          this.notifyListeners(data);
        } else {
          console.error('Message WebSocket invalide:', data);
        }
      } catch (error) {
        console.error('Erreur de parsing WebSocket:', error);
      }
    };

    this.ws.onclose = () => {
      clearTimeout(this.connectionTimeout);
      console.log('WebSocket déconnecté');
      this.handleReconnect();
    };

    this.ws.onerror = (error) => {
      clearTimeout(this.connectionTimeout);
      console.error('Erreur WebSocket:', error);
      toast.error('Erreur de connexion aux notifications');
    };
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        const userEmail = localStorage.getItem(config.USER_EMAIL_KEY);
        if (userEmail) {
          this.connect(userEmail);
        }
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      toast.error('Impossible de se reconnecter aux notifications');
    }
  }

  disconnect() {
    clearTimeout(this.connectionTimeout);
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.clearListeners();
  }

  send(data) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      this.messageQueue.push(data);
    }
  }

  addListener(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type).add(callback);
  }

  removeListener(type, callback) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).delete(callback);
    }
  }

  clearListeners() {
    this.listeners.clear();
  }

  notifyListeners(data) {
    const type = data.type;
    if (this.listeners.has(type)) {
      this.listeners.get(type).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Erreur dans le listener:', error);
        }
      });
    }
  }
}

export const websocketService = new WebSocketService();
export default websocketService; 