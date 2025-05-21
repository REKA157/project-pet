import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const NotificationListener = () => {
    const [ws, setWs] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Mode démo : pas de WebSocket
        if (token === 'demo-token') {
            // Simuler quelques notifications pour le mode démo
            const demoNotifications = [
                {
                    id: 1,
                    message: 'Bienvenue dans le mode démo !',
                    timestamp: new Date()
                },
                {
                    id: 2,
                    message: 'Votre chien a besoin d\'une promenade',
                    timestamp: new Date()
                }
            ];
            setNotifications(demoNotifications);
            return;
        }

        // Mode production : connexion WebSocket
        try {
            const userEmail = localStorage.getItem('userEmail');
            const wsUrl = import.meta.env.PROD 
                ? `wss://project-pet-backend.onrender.com/ws/notifications/${userEmail}`
                : `ws://localhost:8000/ws/notifications/${userEmail}`;

            const websocket = new WebSocket(wsUrl);
            
            websocket.onopen = () => {
                console.log('Connecté aux notifications');
            };

            websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'notification') {
                    setNotifications(prev => [{
                        id: Date.now(),
                        message: data.message,
                        timestamp: new Date()
                    }, ...prev]);

                    toast(data.message, {
                        duration: 4000,
                        position: 'top-right',
                        icon: '🔔'
                    });
                }
            };

            websocket.onerror = (error) => {
                console.error('Erreur WebSocket:', error);
            };

            websocket.onclose = () => {
                console.log('Déconnecté des notifications');
            };

            setWs(websocket);

            return () => {
                websocket.close();
            };
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 relative"
            >
                🔔
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications.length}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl">
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <p className="p-4 text-gray-500 text-center">
                                Aucune notification
                            </p>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className="p-4 border-b hover:bg-gray-50"
                                >
                                    <p className="text-sm">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {notification.timestamp.toLocaleTimeString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationListener; 