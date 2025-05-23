import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaPaw, FaUser, FaSignOutAlt, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { MdHealthAndSafety, MdFavorite, MdMic, MdGpsFixed, MdAssistant } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Accueil', icon: <FaHome className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { path: '/app/dashboard', label: 'Dashboard', icon: <FaPaw className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { path: '/app/profile', label: 'Profil', icon: <FaUser className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { path: '/app/radar', label: 'Radar', icon: <MdGpsFixed className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { path: '/app/meet', label: 'PetMeet', icon: <MdFavorite className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { path: '/app/upload-audio', label: 'Audio', icon: <MdMic className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { path: '/app/geotracker', label: 'Géo', icon: <MdGpsFixed className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { path: '/app/assistant', label: 'Assistant', icon: <MdAssistant className="w-4 h-4 sm:w-5 sm:h-5" /> }
  ];

  return (
    <header className={`bg-white shadow-md sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaPaw className="h-6 w-6 sm:h-8 sm:w-8 text-nature-600 group-hover:text-nature-700" />
            </motion.div>
            <span className="ml-2 text-lg sm:text-xl font-bold text-nature-900 group-hover:text-nature-700 transition-colors">
              VetCare
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-2 lg:px-3 py-2 rounded-lg transition-colors flex items-center text-sm lg:text-base ${
                    isActive 
                      ? 'text-white bg-nature-600' 
                      : 'text-nature-600 hover:bg-nature-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="mr-1 lg:mr-2">{item.icon}</span>
                {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-nature-600 rounded-lg -z-10"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {userEmail ? (
              <>
                <span className="text-gray-600 flex items-center text-sm lg:text-base">
                  <FaUser className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                  {userEmail}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-red-600 transition-colors text-sm lg:text-base"
                >
                  <FaSignOutAlt className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                  Déconnexion
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                    className="text-nature-600 hover:text-nature-700 transition-colors flex items-center text-sm lg:text-base"
              >
                    <FaUser className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                Connexion
              </motion.button>
                </Link>
                <Link to="/register">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
                    className="bg-nature-600 text-white px-2 lg:px-4 py-1 lg:py-2 rounded-lg hover:bg-nature-700 transition-colors flex items-center text-sm lg:text-base"
            >
                    <FaPaw className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
              S'inscrire
            </motion.button>
                </Link>
              </>
            )}
          </div>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-nature-600 p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-2"
            >
              <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition-colors flex items-center text-sm ${
                        isActive 
                          ? 'text-white bg-nature-600' 
                          : 'text-nature-600 hover:bg-nature-50'
                      }`
                  }
                    onClick={() => setIsOpen(false)}
                >
                    <span className="mr-2">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
              {userEmail ? (
                <>
                    <div className="px-3 py-2 text-gray-600 flex items-center text-sm">
                      <FaUser className="w-4 h-4 mr-2" />
                      {userEmail}
                    </div>
                  <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="px-3 py-2 text-gray-600 hover:text-red-600 transition-colors flex items-center text-sm"
                  >
                      <FaSignOutAlt className="w-4 h-4 mr-2" />
                    Déconnexion
                  </button>
                </>
              ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <div className="px-3 py-2 text-nature-600 hover:bg-nature-50 rounded-lg flex items-center text-sm">
                        <FaUser className="w-4 h-4 mr-2" />
                  Connexion
                      </div>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <div className="px-3 py-2 bg-nature-600 text-white rounded-lg hover:bg-nature-700 flex items-center text-sm">
                        <FaPaw className="w-4 h-4 mr-2" />
                S'inscrire
            </div>
                    </Link>
                  </>
                )}
          </div>
            </motion.div>
        )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;