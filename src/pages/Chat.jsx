import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [ws, setWs] = useState(null);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const { chatId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Connexion WebSocket
        const websocket = new WebSocket(`ws://localhost:8000/ws/chat/${chatId}`);
        
        websocket.onopen = () => {
            console.log('Connecté au chat');
        };

        websocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [...prev, message]);
        };

        websocket.onerror = (error) => {
            console.error('Erreur WebSocket:', error);
            setError('Erreur de connexion au chat');
        };

        websocket.onclose = () => {
            console.log('Déconnecté du chat');
        };

        setWs(websocket);

        // Charger l'historique des messages
        fetchMessages(token);

        return () => {
            websocket.close();
        };
    }, [chatId, navigate]);

    const fetchMessages = async (token) => {
        try {
            const response = await axios.get(`http://localhost:8000/chat/${chatId}/messages`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
        } catch (err) {
            setError('Erreur lors du chargement des messages');
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !ws) return;

        const message = {
            text: newMessage.trim()
        };

        ws.send(JSON.stringify(message));
        setNewMessage('');
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-2xl mx-auto">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${
                                message.sender === localStorage.getItem('userEmail')
                                    ? 'text-right'
                                    : 'text-left'
                            }`}
                        >
                            <div
                                className={`inline-block p-3 rounded-lg ${
                                    message.sender === localStorage.getItem('userEmail')
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                }`}
                            >
                                <p>{message.text}</p>
                                <p className="text-xs mt-1 opacity-75">
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-white border-t">
                <div className="max-w-2xl mx-auto flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Écrivez votre message..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Envoyer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat; 