import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GeoTracker = () => {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifier si l'utilisateur est connecté
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Obtenir la position actuelle
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    setError("Erreur lors de la récupération de la position: " + error.message);
                }
            );
        } else {
            setError("La géolocalisation n'est pas supportée par votre navigateur");
        }
    }, [navigate]);

    const sendPosition = async () => {
        if (!position) return;

        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:8000/api/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(position)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi de la position');
            }

            setMessage('Position envoyée avec succès !');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
                                    Géolocalisation
                                </h2>

                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                                        {error}
                                    </div>
                                )}

                                {message && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                                        {message}
                                    </div>
                                )}

                                {position && (
                                    <div className="space-y-4">
                                        <p className="text-gray-600">
                                            Latitude: {position.latitude.toFixed(6)}
                                        </p>
                                        <p className="text-gray-600">
                                            Longitude: {position.longitude.toFixed(6)}
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={sendPosition}
                                    disabled={!position || isLoading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                        ${!position || isLoading 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        }`}
                                >
                                    {isLoading ? 'Envoi en cours...' : 'Envoyer position'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeoTracker; 
