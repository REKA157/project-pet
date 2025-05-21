import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUser, FaThumbsUp, FaComment } from 'react-icons/fa';

const LocationReviews = ({ location, onAddReview }) => {
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviews] = useState([
    {
      id: 1,
      user: 'Marie L.',
      rating: 5,
      comment: 'Super parc pour les chiens ! Beaucoup d\'espace et bien entretenu.',
      date: '2024-02-15',
      likes: 12
    },
    {
      id: 2,
      user: 'Pierre D.',
      rating: 4,
      comment: 'Très bon endroit, mais il manque des poubelles.',
      date: '2024-02-10',
      likes: 8
    }
  ]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    onAddReview({
      ...newReview,
      id: reviews.length + 1,
      user: 'Vous',
      date: new Date().toISOString().split('T')[0],
      likes: 0
    });
    setNewReview({ rating: 5, comment: '' });
  };

  return (
    <div className="bg-white rounded-xl p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Avis et notes</h3>
      
      {/* Formulaire d'ajout d'avis */}
      <form onSubmit={handleSubmitReview} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Votre note
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setNewReview({ ...newReview, rating: star })}
                className="text-2xl"
              >
                <FaStar
                  className={`${
                    star <= newReview.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Votre commentaire
          </label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-500"
            rows="3"
            placeholder="Partagez votre expérience..."
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-nature-600 text-white py-2 rounded-lg hover:bg-nature-700 transition-colors"
        >
          Publier mon avis
        </motion.button>
      </form>

      {/* Liste des avis */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-gray-200 pb-4 last:border-0"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-nature-100 flex items-center justify-center">
                  <FaUser className="w-4 h-4 text-nature-600" />
                </div>
                <div className="ml-2">
                  <p className="font-medium text-gray-900">{review.user}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaStar className="text-yellow-400 w-4 h-4" />
                <span className="ml-1 text-gray-600">{review.rating}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-gray-500 hover:text-nature-600"
              >
                <FaThumbsUp className="w-4 h-4 mr-1" />
                <span className="text-sm">{review.likes}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-gray-500 hover:text-nature-600"
              >
                <FaComment className="w-4 h-4 mr-1" />
                <span className="text-sm">Répondre</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LocationReviews; 