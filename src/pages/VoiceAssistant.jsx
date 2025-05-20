import React, { useState, useEffect, useCallback } from 'react';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fonction pour parler
  const speak = useCallback((text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }, []);

  // Fonction pour traiter les commandes
  const processCommand = useCallback(async (command) => {
    setIsProcessing(true);
    setMessage('Traitement de la commande...');

    try {
      if (command.includes('trouve les chiens proches') || 
          command.includes('montre-moi les chiens à proximité') ||
          command.includes('radar canin')) {
        speak('Je recherche les chiens à proximité...');
        const response = await fetch('http://localhost:8000/dogs/nearby');
        const data = await response.json();
        console.log('Chiens à proximité :', data);
        speak(`J'ai trouvé ${data.length} chiens à proximité.`);
        setMessage(`${data.length} chiens trouvés ! Vérifiez la console pour plus de détails.`);
      } 
      else if (command.includes('bonjour')) {
        speak('Bonjour maître ! Comment puis-je vous aider aujourd\'hui ?');
        setMessage('Bonjour maître !');
      }
      else if (command.includes('aide') || command.includes('commandes')) {
        const helpText = 'Voici les commandes disponibles : trouver les chiens proches, radar canin, bonjour, aide.';
        speak(helpText);
        setMessage(helpText);
      }
      else if (command.includes('merci')) {
        speak('Je vous en prie ! N\'hésitez pas si vous avez besoin d\'autre chose.');
        setMessage('Je vous en prie !');
      }
      else {
        speak('Désolé, je n\'ai pas compris cette commande. Dites "aide" pour connaître les commandes disponibles.');
        setMessage('Commande non reconnue. Dites "aide" pour la liste des commandes.');
      }
    } catch (err) {
      const errorMessage = 'Une erreur est survenue lors du traitement de la commande.';
      speak(errorMessage);
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [speak]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'fr-FR';

      recognition.onstart = () => {
        setIsListening(true);
        setError('');
        setMessage('');
        speak('Je vous écoute...');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        const errorMessages = {
          'no-speech': 'Je n\'ai pas entendu de voix.',
          'aborted': 'La reconnaissance vocale a été interrompue.',
          'audio-capture': 'Je ne peux pas accéder à votre microphone.',
          'network': 'Erreur réseau. Vérifiez votre connexion.',
          'not-allowed': 'Accès au microphone refusé.',
          'service-not-allowed': 'Service de reconnaissance vocale non autorisé.',
          'bad-grammar': 'Erreur de grammaire dans la reconnaissance.',
          'language-not-supported': 'La langue française n\'est pas supportée.'
        };
        const errorMessage = errorMessages[event.error] || `Erreur de reconnaissance : ${event.error}`;
        speak(errorMessage);
        setError(errorMessage);
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setTranscript(transcript);
        processCommand(transcript);
      };

      setRecognition(recognition);
    } else {
      setError('La reconnaissance vocale n\'est pas supportée par votre navigateur');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, [processCommand, speak]);

  const toggleListening = () => {
    if (!recognition || isProcessing) return;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Assistant Vocal</h2>

        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={toggleListening}
            disabled={!recognition || isProcessing}
            className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } ${(!recognition || isProcessing) && 'opacity-50 cursor-not-allowed'}`}
          >
            🎙️
          </button>

          {error && (
            <div className="w-full p-4 bg-red-100 text-red-700 rounded-md animate-fade-in">
              {error}
            </div>
          )}

          {message && (
            <div className="w-full p-4 bg-green-100 text-green-700 rounded-md animate-fade-in">
              {message}
            </div>
          )}

          {transcript && (
            <div className="w-full p-4 bg-gray-50 rounded-md animate-fade-in">
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Vous avez dit :
              </h3>
              <p className="text-gray-800">{transcript}</p>
            </div>
          )}

          {!recognition && (
            <p className="text-sm text-gray-600 text-center">
              Votre navigateur ne supporte pas la reconnaissance vocale.
              Essayez Chrome ou Edge pour une meilleure expérience.
            </p>
          )}

          {isProcessing && (
            <div className="flex items-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Traitement en cours...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant; 