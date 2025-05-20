import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaPaw, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Accueil', emoji: '��' },
    { path: '/profile', label: 'Profil', emoji: '🐶' },
    { path: '/radar', label: 'Radar', emoji: '📍' },
    { path: '/meet', label: 'Rencontres', emoji: '❤️' },
    { path: '/health', label: 'Santé', emoji: '🩺' },
    { path: '/upload-audio', label: 'Audio', emoji: '🎤' },
    { path: '/geo', label: 'GPS', emoji: '🛰️' },
    { path: '/assistant', label: 'Assistant vocal', emoji: '🗣️' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <FaPaw className="h-8 w-8 text-nature-600" />
            <span className="ml-2 text-xl font-semibold text-nature-900">VetCare</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-nature-600 hover:text-nature-900 ${isActive ? 'bg-blue-500 text-white' : ''}`
                }
              >
                <span className="mr-2">{item.emoji}</span>
                {item.label}
              </NavLink>
            ))}
            <Link to="/pet-sound-chat" className="flex items-center text-nature-600 hover:text-nature-900">
              <FaHeart className="mr-2" />
              PetMeet
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            {userEmail ? (
              <>
                <span className="text-gray-600">
                  Connecté en tant que {userEmail}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-nature-600 hover:text-nature-900"
              >
                Connexion
              </motion.button>
            )}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-nature-600 text-white px-4 py-2 rounded-md hover:bg-nature-700"
            >
              S'inscrire
            </motion.button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-nature-600 hover:text-nature-900 ${isActive ? 'bg-blue-500 text-white' : ''}`
                  }
                >
                  <span className="mr-2">{item.emoji}</span>
                  {item.label}
                </NavLink>
              ))}
              <Link to="/pet-sound-chat" className="flex items-center text-nature-600 hover:text-nature-900">
                <FaHeart className="mr-2" />
                PetMeet
              </Link>
              {userEmail ? (
                <>
                  <span className="text-gray-600">
                    Connecté en tant que {userEmail}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Connexion
                </NavLink>
              )}
              <button className="bg-nature-600 text-white px-4 py-2 rounded-md hover:bg-nature-700">
                S'inscrire
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;