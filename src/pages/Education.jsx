import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaVideo, FaBook } from 'react-icons/fa';

function Education() {
  const courses = [
    {
      title: 'Premiers secours animaliers',
      duration: '2h',
      level: 'Débutant',
      description: 'Apprenez les gestes qui sauvent pour votre animal'
    },
    {
      title: 'Nutrition et alimentation',
      duration: '3h',
      level: 'Intermédiaire',
      description: 'Les bases d\'une alimentation équilibrée'
    },
    {
      title: 'Comportement canin',
      duration: '4h',
      level: 'Avancé',
      description: 'Comprendre et éduquer son chien'
    }
  ];

  const webinars = [
    {
      title: 'Prévention des maladies courantes',
      date: '12 Jan 2024',
      expert: 'Dr. Martin',
      spots: '45 places restantes'
    },
    {
      title: 'Bien-être animal et environnement',
      date: '18 Jan 2024',
      expert: 'Dr. Dubois',
      spots: '30 places restantes'
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
            Espace Formation
          </h1>
          <p className="text-xl text-gray-600">
            Développez vos connaissances en santé animale
          </p>
        </motion.div>

        {/* Courses Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <FaGraduationCap className="text-2xl text-indigo-600 mr-2" />
            <h2 className="text-2xl font-semibold">Cours en ligne</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <div className="flex space-x-4 text-sm text-gray-600 mb-4">
                  <span>{course.duration}</span>
                  <span>•</span>
                  <span>{course.level}</span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Commencer
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Webinars Section */}
        <div>
          <div className="flex items-center mb-6">
            <FaVideo className="text-2xl text-indigo-600 mr-2" />
            <h2 className="text-2xl font-semibold">Webinaires à venir</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {webinars.map((webinar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
                <div className="text-gray-600 mb-4">
                  <p>Date : {webinar.date}</p>
                  <p>Expert : {webinar.expert}</p>
                  <p className="text-indigo-600">{webinar.spots}</p>
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  S'inscrire
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;