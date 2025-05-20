import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SmartAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [history, setHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationContext, setConversationContext] = useState(null);
  const navigate = useNavigate();

  // Configuration de la reconnaissance vocale
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'fr-FR';

  // Configuration de la synthèse vocale
  const speak = useCallback((text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    window.speechSynthesis.speak(utterance);
  }, []);

  // Gestion de la reconnaissance vocale
  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      processCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Erreur de reconnaissance:', event.error);
      setIsListening(false);
      toast.error('Erreur de reconnaissance vocale');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.abort();
    };
  }, [conversationContext]);

  // Traitement de la commande avec OpenAI
  const processCommand = async (command) => {
    setIsProcessing(true);
    try {
      const messages = [
        {
          role: 'system',
          content: `Tu es un assistant vocal pour une application de gestion de chiens.
          Réponds toujours en JSON avec la structure suivante :
          {
            "action": "action_name",
            "params": { ... }
          }
          
          Actions disponibles :
          - create_dog: { name, race, mood }
          - open_radar: {}
          - analyze_audio: {}
          - open_chat: { username }
          - show_profile: {}
          - logout: {}
          - delete_dog: { name }
          - get_dog_status: { name }
          - add_health_note: { name }
          - await_details: { message }
          
          Si tu as besoin de plus d'informations, utilise l'action "await_details".`
        }
      ];

      if (conversationContext) {
        messages.push(conversationContext);
      }

      messages.push({
        role: 'user',
        content: command
      });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          temperature: 0.2
        })
      });

      const data = await response.json();
      const aiResponse = JSON.parse(data.choices[0].message.content);
      
      // Ajouter à l'historique
      setHistory(prev => [...prev, {
        command,
        action: aiResponse.action,
        params: aiResponse.params,
        timestamp: new Date().toISOString()
      }]);

      // Gérer la conversation multi-tours
      if (aiResponse.action === 'await_details') {
        setConversationContext({
          role: 'assistant',
          content: JSON.stringify(aiResponse)
        });
        speak(aiResponse.params.message);
        setTimeout(() => {
          setIsListening(true);
          recognition.start();
        }, 1000);
        return;
      }

      // Réinitialiser le contexte de conversation
      setConversationContext(null);

      // Exécuter l'action
      await executeAction(aiResponse);
    } catch (error) {
      console.error('Erreur OpenAI:', error);
      toast.error('Erreur de traitement de la commande');
      speak('Désolé, je n\'ai pas pu traiter votre demande');
    } finally {
      setIsProcessing(false);
    }
  };

  // Exécution des actions
  const executeAction = async (response) => {
    switch (response.action) {
      case 'create_dog':
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/dogs`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(response.params)
          });
          
          if (res.ok) {
            const message = `${response.params.name} a été ajouté avec succès`;
            speak(message);
            toast.success(message);
          } else {
            throw new Error('Erreur lors de la création du chien');
          }
        } catch (error) {
          console.error('Erreur création chien:', error);
          speak('Désolé, je n\'ai pas pu créer le profil du chien');
        }
        break;

      case 'open_radar':
        navigate('/radar');
        speak('Voici la page radar');
        break;

      case 'analyze_audio':
        navigate('/upload-audio');
        speak('Audio prêt à analyser');
        break;

      case 'open_chat':
        navigate(`/chat/${response.params.username}`);
        speak(`Ouverture du chat avec ${response.params.username}`);
        break;

      case 'show_profile':
        navigate('/profile');
        speak('Voici votre profil');
        break;

      case 'logout':
        localStorage.removeItem('token');
        navigate('/login');
        speak('Vous êtes déconnecté');
        break;

      case 'delete_dog':
        try {
          // Récupérer la liste des chiens
          const dogsRes = await fetch(`${import.meta.env.VITE_API_BASE}/api/dogs`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const dogs = await dogsRes.json();
          const dog = dogs.find(d => d.name.toLowerCase() === response.params.name.toLowerCase());
          
          if (dog) {
            const deleteRes = await fetch(`${import.meta.env.VITE_API_BASE}/api/dogs/${dog.id}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });
            
            if (deleteRes.ok) {
              const message = `${response.params.name} a été supprimé`;
              speak(message);
              toast.success(message);
            } else {
              throw new Error('Erreur lors de la suppression');
            }
          } else {
            speak(`Je n'ai pas trouvé de chien nommé ${response.params.name}`);
          }
        } catch (error) {
          console.error('Erreur suppression:', error);
          speak('Désolé, je n\'ai pas pu supprimer le chien');
        }
        break;

      case 'get_dog_status':
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE}/api/dogs/status?name=${response.params.name}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
          
          if (res.ok) {
            const status = await res.json();
            const message = `${response.params.name} est ${status.mood} et se trouve à ${status.location}`;
            speak(message);
            toast.success(message);
          } else {
            throw new Error('Erreur lors de la récupération du statut');
          }
        } catch (error) {
          console.error('Erreur statut:', error);
          speak('Désolé, je n\'ai pas pu récupérer le statut du chien');
        }
        break;

      case 'add_health_note':
        navigate('/health');
        speak('Formulaire santé non encore actif');
        break;

      default:
        speak('Je ne comprends pas cette action');
        break;
    }
  };

  // Démarrage/arrêt de l'écoute
  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Assistant Vocal</h1>
        
        {/* Contrôle principal */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <button
            onClick={toggleListening}
            disabled={isProcessing}
            className={`w-full py-4 px-6 rounded-lg text-white font-semibold transition-colors ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">
                {isListening ? '🎙️' : '🎧'}
              </span>
              <span>
                {isListening ? 'Arrêter l\'écoute' : 'Démarrer l\'écoute'}
              </span>
            </div>
          </button>

          {transcript && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Vous avez dit :</span> {transcript}
              </p>
            </div>
          )}

          {isProcessing && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Traitement en cours...</p>
            </div>
          )}
        </div>

        {/* Historique */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Historique des commandes</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {history.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <p className="text-gray-600">
                  <span className="font-semibold">Commande :</span> {item.command}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Action :</span> {item.action}
                </p>
                {item.params && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Paramètres :</span>{' '}
                    {JSON.stringify(item.params)}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartAssistant; 