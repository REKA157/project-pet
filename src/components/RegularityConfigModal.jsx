import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegularityConfigModal = ({ onSave, onClose }) => {
  const [localReminders, setLocalReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get('/api/reminders');
        setLocalReminders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Échec du chargement des rappels.');
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  const toggleReminder = (index) => {
    const updatedReminders = [...localReminders];
    updatedReminders[index].status =
      updatedReminders[index].status === 'Terminé' ? 'En attente' : 'Terminé';
    setLocalReminders(updatedReminders);
  };

  const addReminder = () => {
    const newReminder = { label: 'Nouveau rappel', status: 'En attente' };
    setLocalReminders([...localReminders, newReminder]);
  };

  const deleteReminder = (index) => {
    const updatedReminders = localReminders.filter((_, i) => i !== index);
    setLocalReminders(updatedReminders);
  };

  const saveReminders = async () => {
    try {
      await axios.post('/api/reminders', { reminders: localReminders });
      onSave(localReminders);
    } catch (err) {
      setError('Échec de l\'enregistrement des rappels.');
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Gestion des rappels</h2>
        <ul className="space-y-2">
          {localReminders.map((reminder, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{reminder.label}</span>
              <div className="space-x-2">
                <button
                  onClick={() => toggleReminder(index)}
                  className={`text-sm px-2 py-1 rounded ${
                    reminder.status === 'Terminé' ? 'bg-green-200' : 'bg-yellow-200'
                  }`}
                >
                  {reminder.status}
                </button>
                <button
                  onClick={() => deleteReminder(index)}
                  className="text-sm px-2 py-1 bg-red-200 rounded"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={addReminder}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Ajouter un rappel
        </button>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={saveReminders}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Sauvegarder
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegularityConfigModal;
