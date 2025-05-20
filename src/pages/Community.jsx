import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaComments, FaCalendarAlt, FaSearch, FaHeart, FaPaw } from 'react-icons/fa';

function Community() {
  const [activeTab, setActiveTab] = useState('forum');
  const [searchTerm, setSearchTerm] = useState('');

  const forumTopics = [
    { 
      title: 'Nutrition et alimentation',
      posts: 156,
      lastActivity: '2h',
      author: 'Dr. Martin',
      excerpt: 'Les meilleures pratiques pour une alimentation équilibrée...'
    },
    { 
      title: 'Comportement animal',
      posts: 243,
      lastActivity: '30m',
      author: 'Sarah B.',
      excerpt: 'Comment gérer l\'anxiété de séparation chez les chiens...'
    },
    { 
      title: 'Santé et bien-être',
      posts: 189,
      lastActivity: '1h',
      author: 'Dr. Dubois',
      excerpt: 'Prévention des maladies courantes chez les chats...'
    },
    { 
      title: 'Races et adoption',
      posts: 127,
      lastActivity: '4h',
      author: 'Association PAW',
      excerpt: 'Guide complet pour l\'adoption responsable...'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Journée adoption',
      date: '15 Jan 2024',
      location: 'Paris',
      organizer: 'VetCare & SPA',
      description: 'Rencontrez votre futur compagnon lors de notre journée spéciale adoption.',
      participants: 45
    },
    {
      title: 'Atelier premiers secours',
      date: '22 Jan 2024',
      location: 'Lyon',
      organizer: 'Dr. Martin',
      description: 'Apprenez les gestes qui sauvent pour votre animal.',
      participants: 28
    },
    {
      title: 'Conférence nutrition',
      date: '5 Fév 2024',
      location: 'En ligne',
      organizer: 'VetCare Academy',
      description: 'Tout savoir sur l\'alimentation de votre animal.',
      participants: 120
    }
  ];

  const successStories = [
    {
      title: 'Luna retrouve la forme',
      author: 'Marie D.',
      date: '2 jours',
      likes: 45,
      content: 'Grâce aux conseils de la communauté, Luna a retrouvé toute son énergie...',
      image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: 'Max et son nouveau foyer',
      author: 'Pierre L.',
      date: '5 jours',
      likes: 67,
      content: 'L\'adoption de Max a changé notre vie. Merci à tous pour vos conseils...',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Communauté VetCare
          </h1>
          <p className="text-xl text-gray-600">
            Rejoignez une communauté passionnée d'animaux
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Rechercher dans la communauté..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nature-500 focus:border-transparent"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab('forum')}
            className={`px-6 py-2 rounded-full mr-4 ${
              activeTab === 'forum'
                ? 'bg-nature-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Forum
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-2 rounded-full mr-4 ${
              activeTab === 'events'
                ? 'bg-nature-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Événements
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-6 py-2 rounded-full ${
              activeTab === 'stories'
                ? 'bg-nature-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Témoignages
          </button>
        </div>

        {/* Content Sections */}
        {activeTab === 'forum' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <FaComments className="text-2xl text-nature-600 mr-2" />
                  <h2 className="text-2xl font-semibold">Discussions récentes</h2>
                </div>
                <div className="space-y-6">
                  {forumTopics.map((topic, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {topic.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{topic.excerpt}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-4">Par {topic.author}</span>
                            <span>Il y a {topic.lastActivity}</span>
                          </div>
                        </div>
                        <span className="bg-nature-100 text-nature-600 px-3 py-1 rounded-full text-sm">
                          {topic.posts} messages
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <button className="mt-6 w-full bg-nature-600 text-white py-2 rounded-md hover:bg-nature-700 transition-colors">
                  Voir toutes les discussions
                </button>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <FaUsers className="text-2xl text-nature-600 mr-2" />
                  <h2 className="text-2xl font-semibold">Communauté active</h2>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-nature-50 rounded-lg">
                    <div className="text-4xl font-bold text-nature-600 mb-2">2,547</div>
                    <div className="text-gray-600">Membres actifs</div>
                  </div>
                  <div className="text-center p-4 bg-nature-50 rounded-lg">
                    <div className="text-4xl font-bold text-nature-600 mb-2">157</div>
                    <div className="text-gray-600">Discussions aujourd'hui</div>
                  </div>
                  <button className="w-full bg-nature-600 text-white py-2 rounded-md hover:bg-nature-700 transition-colors">
                    Rejoindre la communauté
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="mr-2" />
                      {event.participants} participants
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-nature-600 text-white py-2 rounded-md hover:bg-nature-700 transition-colors">
                    S'inscrire
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-4">{story.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaPaw className="mr-2" />
                      {story.author}
                    </div>
                    <div className="flex items-center">
                      <FaHeart className="mr-2 text-rose-500" />
                      {story.likes} likes
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Community;