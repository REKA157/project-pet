import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DogSwipe = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSuggestions();
    }, []);

    const fetchSuggestions = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:8000/match/suggestions', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuggestions(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.detail || 'Une erreur est survenue');
            setLoading(false);
        }
    };

    const handleLike = async (isLiked) => {
        try {
            const token = localStorage.getItem('token');
            const currentDog = suggestions[currentIndex];

            await axios.post('http://localhost:8000/match/like', {
                dog2_id: currentDog.id,
                is_liked: isLiked
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Passer au prochain chien
            if (currentIndex < suggestions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setSuggestions([]);
                setError('Plus de suggestions disponibles');
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Une erreur est survenue');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => navigate('/profile')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Retour au profil
                </button>
            </div>
        );
    }

    if (suggestions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-gray-600 mb-4">Plus de suggestions disponibles</p>
                <button
                    onClick={() => navigate('/profile')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Retour au profil
                </button>
            </div>
        );
    }

    const currentDog = suggestions[currentIndex];

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                    {currentDog.profile_picture ? (
                        <img
                            src={currentDog.profile_picture}
                            alt={currentDog.name}
                            className="w-full h-96 object-cover"
                        />
                    ) : (
                        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">Pas de photo</span>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h2 className="text-white text-2xl font-bold">{currentDog.name}</h2>
                        <p className="text-white">{currentDog.race}</p>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-gray-600">Humeur: {currentDog.mood}</p>
                            {currentDog.distance_km && (
                                <p className="text-gray-600">
                                    Distance: {Math.round(currentDog.distance_km)} km
                                </p>
                            )}
                        </div>
                        <div className="text-right">
                            <p className="text-blue-500 font-semibold">
                                Compatibilité: {Math.round(currentDog.compatibility_score * 100)}%
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => handleLike(false)}
                            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
                        >
                            Passer
                        </button>
                        <button
                            onClick={() => handleLike(true)}
                            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
                        >
                            J'aime
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DogSwipe; 