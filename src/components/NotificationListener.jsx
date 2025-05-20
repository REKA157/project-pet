import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import jwt_decode from 'jwt-decode';

const NotificationListener = () => {
    const [ws, setWs] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decoded = jwt_decode(token);
            const userEmail = decoded.sub;

            const websocket = new WebSocket(`ws://localhost:8000/ws/notifications/${userEmail}`);
            
            websocket.onopen = () => {
                console.log('Connecté aux notifications');
            };

            websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'notification') {
                    // Ajouter la notification à la liste
                    setNotifications(prev => [{
                        id: Date.now(),
                        message: data.message,
                        timestamp: new Date()
                    }, ...prev]);

                    // Afficher le toast
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
            console.error('Erreur de décodage du token:', error);
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