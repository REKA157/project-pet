import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    race: '',
    humeur: 'joyeux'
  });
  const [isApiAvailable, setIsApiAvailable] = useState(true);
  const [message, setMessage] = useState('');

  // Vérification de la disponibilité de l'API
  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch('http://localhost:8000/ping');
        setIsApiAvailable(response.ok);
      } catch (error) {
        setIsApiAvailable(false);
      }
    };
    checkApi();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/dogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Réponse du backend:', await response.json());

      if (response.ok) {
        setMessage('Chien ajouté avec succès !');
        setFormData({
          name: '',
          race: '',
          humeur: 'joyeux'
        });
      } else {
        throw new Error('Erreur lors de l\'ajout du chien');
      }
    } catch (error) {
      setMessage('Erreur: ' + error.message);
    }
  };

  if (!isApiAvailable) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">API indisponible</h2>
          <p className="text-gray-600">Veuillez vérifier que le serveur backend est en cours d'exécution.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un chien</h2>
        
        {message && (
          <div className={`p-4 mb-4 rounded ${
            message.includes('succès') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="race" className="block text-sm font-medium text-gray-700 mb-1">
              Race
            </label>
            <input
              type="text"
              id="race"
              name="race"
              value={formData.race}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="humeur" className="block text-sm font-medium text-gray-700 mb-1">
              Humeur
            </label>
            <select
              id="humeur"
              name="humeur"
              value={formData.humeur}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="joyeux">Joyeux</option>
              <option value="calme">Calme</option>
              <option value="joueur">Joueur</option>
              <option value="fatigué">Fatigué</option>
              <option value="anxieux">Anxieux</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Ajouter le chien
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile; 