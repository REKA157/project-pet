import React, { useState } from 'react';
import { MdFeedback } from 'react-icons/md';
import { motion } from 'framer-motion';

function FeedbackButton() {
  const [showFeedback, setShowFeedback] = useState(false);

  const FeedbackModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-xl max-w-md w-full mx-4"
      >
        <h3 className="text-2xl font-bold mb-4">Votre avis compte</h3>
        <textarea 
          className="w-full p-3 border rounded-md mb-4" 
          placeholder="Partagez votre expérience..."
          rows="4"
        />
        <div className="flex justify-end space-x-3">
          <button 
            onClick={() => setShowFeedback(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button 
            onClick={() => {
              alert('Merci pour votre retour !');
              setShowFeedback(false);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Envoyer
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      {showFeedback && <FeedbackModal />}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowFeedback(true)}
        className="fixed bottom-6 left-6 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
      >
        <MdFeedback className="w-5 h-5" />
        <span>Feedback</span>
      </motion.button>
    </>
  );
}

export default FeedbackButton;