import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShare, FaMapMarkerAlt, FaClock, FaUserFriends, FaBell, FaUserPlus, FaCheck, FaTimes, FaLock, FaHistory, FaComments, FaEllipsisV } from 'react-icons/fa';

const ShareLocation = ({ userLocation, onShare }) => {
  const [shareDuration, setShareDuration] = useState(30); // minutes
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [sharedWith, setSharedWith] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [timeLeft, setTimeLeft] = useState(shareDuration * 60);
  const [showChat, setShowChat] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [privacySettings, setPrivacySettings] = useState({
    showExactLocation: true,
    showLastSeen: true,
    allowChat: true,
    notifyOnView: true
  });
  const [shareHistory, setShareHistory] = useState([]);
  const chatEndRef = useRef(null);

  // Simuler des contacts pour l'exemple
  const contacts = [
    { id: 1, name: 'Marie', avatar: '👩', lastSeen: '2 min', isOnline: true },
    { id: 2, name: 'Pierre', avatar: '👨', lastSeen: '5 min', isOnline: false },
    { id: 3, name: 'Sophie', avatar: '👩', lastSeen: 'En ligne', isOnline: true }
  ];

  const durationOptions = [15, 30, 60, 120];

  useEffect(() => {
    let timer;
    if (isSharing && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSharing, timeLeft]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleStartSharing = () => {
    setIsSharing(true);
    // Générer un lien de partage unique
    const link = `https://petmeet.com/share/${Math.random().toString(36).substr(2, 9)}`;
    setShareLink(link);
    setTimeLeft(shareDuration * 60);
    onShare({ link, duration: shareDuration, contacts: selectedContacts });
    
    // Ajouter au historique
    const newShare = {
      id: Date.now(),
      date: new Date(),
      duration: shareDuration,
      contacts: selectedContacts,
      link
    };
    setShareHistory(prev => [newShare, ...prev]);
    
    addNotification('Partage démarré', 'Votre position est maintenant partagée');
  };

  const handleStopSharing = () => {
    setIsSharing(false);
    setShareLink('');
    setSelectedContacts([]);
    addNotification('Partage arrêté', 'Votre position n\'est plus partagée');
  };

  const addNotification = (title, message) => {
    const newNotification = {
      id: Date.now(),
      title,
      message,
      time: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 3));
  };

  const toggleContact = (contact) => {
    setSelectedContacts(prev => {
      const isSelected = prev.some(c => c.id === contact.id);
      if (isSelected) {
        return prev.filter(c => c.id !== contact.id);
      } else {
        return [...prev, contact];
      }
    });
  };

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simuler une réponse
    setTimeout(() => {
      const response = {
        id: Date.now(),
        text: 'Je suis en route !',
        sender: 'contact',
        time: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, response]);
    }, 1000);
  };

  const togglePrivacySetting = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Partager ma position</h3>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowHistory(!showHistory)}
            className="text-nature-600 hover:text-nature-700"
          >
            <FaHistory className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPrivacy(!showPrivacy)}
            className="text-nature-600 hover:text-nature-700"
          >
            <FaLock className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowChat(!showChat)}
            className="text-nature-600 hover:text-nature-700"
          >
            <FaComments className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowContacts(!showContacts)}
            className="text-nature-600 hover:text-nature-700"
          >
            <FaUserPlus className="w-5 h-5" />
          </motion.button>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-nature-600 hover:text-nature-700"
            >
              <FaBell className="w-5 h-5" />
            </motion.button>
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-lg z-10 p-4"
          >
            <h4 className="font-medium text-gray-900 mb-3">Historique des partages</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {shareHistory.map(share => (
                <div key={share.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(share.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {share.contacts.length} contacts
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {share.duration} min
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-lg z-10 p-4"
          >
            <h4 className="font-medium text-gray-900 mb-3">Paramètres de confidentialité</h4>
            <div className="space-y-3">
              {Object.entries(privacySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm text-gray-700">
                    {key === 'showExactLocation' && 'Afficher la position exacte'}
                    {key === 'showLastSeen' && 'Afficher la dernière connexion'}
                    {key === 'allowChat' && 'Autoriser le chat'}
                    {key === 'notifyOnView' && 'Notifier quand quelqu\'un regarde'}
                  </label>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => togglePrivacySetting(key)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${
                      value ? 'bg-nature-600' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      animate={{ x: value ? 24 : 0 }}
                      className="w-4 h-4 bg-white rounded-full shadow"
                    />
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-lg z-10"
          >
            <div className="p-4 border-b">
              <h4 className="font-medium text-gray-900">Chat</h4>
            </div>
            <div className="h-60 overflow-y-auto p-4 space-y-3">
              {chatMessages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg ${
                      message.sender === 'me'
                        ? 'bg-nature-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-75">{message.time}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-nature-600 text-white rounded-lg hover:bg-nature-700"
                >
                  Envoyer
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-lg z-10"
          >
            {notifications.map(notification => (
              <div key={notification.id} className="p-3 border-b last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {showContacts && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-gray-50 rounded-lg"
        >
          <h4 className="text-sm font-medium text-gray-700 mb-2">Sélectionner des contacts</h4>
          <div className="space-y-2">
            {contacts.map(contact => (
              <motion.button
                key={contact.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleContact(contact)}
                className={`w-full flex items-center justify-between p-2 rounded-lg ${
                  selectedContacts.some(c => c.id === contact.id)
                    ? 'bg-nature-100 border-nature-300'
                    : 'bg-white border-gray-200'
                } border`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{contact.avatar}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                    <p className="text-xs text-gray-500">Vu il y a {contact.lastSeen}</p>
                  </div>
                </div>
                {selectedContacts.some(c => c.id === contact.id) ? (
                  <FaCheck className="text-nature-600" />
                ) : (
                  <FaTimes className="text-gray-400" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
      
      {!isSharing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée de partage
            </label>
            <div className="flex gap-2">
              {durationOptions.map((duration) => (
                <motion.button
                  key={duration}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShareDuration(duration)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    shareDuration === duration
                      ? 'bg-nature-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {duration} min
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartSharing}
            className="w-full bg-nature-600 text-white py-3 rounded-lg hover:bg-nature-700 transition-colors flex items-center justify-center"
          >
            <FaShare className="w-5 h-5 mr-2" />
            Commencer le partage
          </motion.button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Lien de partage :</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigator.clipboard.writeText(shareLink)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Copier
              </motion.button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <FaClock className="w-4 h-4 mr-2" />
              <span>Expire dans {formatTimeLeft()}</span>
            </div>
            <div className="flex items-center">
              <FaUserFriends className="w-4 h-4 mr-2" />
              <span>{sharedWith.length} personnes</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStopSharing}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            Arrêter le partage
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ShareLocation; 