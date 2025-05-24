import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaPaw, FaUser, FaSignOutAlt, FaHome, FaBars, FaTimes, FaBrain } from 'react-icons/fa';
import { MdHealthAndSafety, MdFavorite, MdMic, MdGpsFixed, MdAssistant, MdPets } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem('userEmail');
  const { i18n, t } = useTranslation();

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

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
  };

  const getIsActive = (item) => {
    if (item.path.startsWith('/app/dashboard?tab=')) {
      const url = new URLSearchParams(location.search);
      const tab = url.get('tab');
      if (item.path.includes('petmeet')) return tab === 'petmeet';
      if (item.path.includes('petsense')) return tab === 'petsense';
      return false;
    }
    return location.pathname === item.path;
  };

  const navItems = [
    { path: '/', label: t('nav.accueil'), icon: <FaHome className="w-4 h-4 sm:w-4 sm:h-4" /> },
    { path: '/app/dashboard', label: t('nav.dashboard'), icon: <FaPaw className="w-4 h-4 sm:w-4 sm:h-4" /> },
    { path: '/app/radar', label: t('nav.radar'), icon: <MdGpsFixed className="w-4 h-4 sm:w-4 sm:h-4" /> },
    { path: '/app/dashboard?tab=petmeet', label: t('nav.petmeet'), icon: (
      <span className="inline-block align-middle">
        <img src="/images/icon_animals_placeholder.svg" alt="PetMeet" className="w-4 h-4 sm:w-4 sm:h-4" style={{ background: 'none' }} />
      </span>
    ) },
    { path: '/app/dashboard?tab=petsense', label: t('nav.petsense'), icon: <FaBrain className="w-4 h-4 sm:w-4 sm:h-4 text-purple-500" /> },
    { path: '/app/assistant', label: t('nav.assistant'), icon: <MdAssistant className="w-4 h-4 sm:w-4 sm:h-4" /> }
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
              PetPulse
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={
                  `relative px-1.5 lg:px-2 py-1.5 text-xs lg:text-sm rounded-lg transition-colors flex items-center text-sm lg:text-base hover:scale-100 ${
                    getIsActive(item)
                      ? 'text-white bg-nature-600'
                      : 'text-nature-600 hover:bg-nature-50'
                  }`
                }
              >
                <span className="mr-1 lg:mr-2">{item.icon}</span>
                {item.label}
                {getIsActive(item) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-nature-600 rounded-lg -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {userEmail ? (
              <>
                <Link to="/app/profile" className="text-gray-600 flex items-center text-sm lg:text-base hover:text-nature-700 transition-colors">
                  <FaUser className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                  {userEmail}
                </Link>
                <div className="relative">
                  <button 
                    className="text-gray-600 hover:text-nature-700 transition-colors flex items-center text-sm lg:text-base"
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  >
                    🌐 <span className="ml-1">{i18n.language.toUpperCase()}</span>
                  </button>
                  {showLanguageDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
                        {['fr', 'en', 'es', 'ru', 'de', 'ar', 'pt', 'it', 'el'].map((lng) => (
                          <button
                            key={lng}
                            onClick={() => handleLanguageChange(lng)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            <img src={`/images/${lng}.png`} alt={lng.toUpperCase()} className="h-4 w-6 mr-2" />
                            {lng.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-red-600 transition-colors text-sm lg:text-base"
                >
                  <FaSignOutAlt className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                  {t('auth.logout')}
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
                {t('auth.login')}
              </motion.button>
                </Link>
                <Link to="/register">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
                    className="bg-nature-600 text-white px-2 lg:px-4 py-1 lg:py-2 rounded-lg hover:bg-nature-700 transition-colors flex items-center text-sm lg:text-base"
            >
                    <FaPaw className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
              {t('auth.register')}
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
                    <Link to="/app/profile" onClick={() => setIsOpen(false)}>
                      <div className="px-3 py-2 text-gray-600 hover:bg-nature-50 rounded-lg flex items-center text-sm">
                        <FaUser className="w-4 h-4 mr-2" />
                      {userEmail}
                    </div>
                    </Link>
                  <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="px-3 py-2 text-gray-600 hover:text-red-600 transition-colors flex items-center text-sm"
                  >
                      <FaSignOutAlt className="w-4 h-4 mr-2" />
                    {t('auth.logout')}
                  </button>
                </>
              ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <div className="px-3 py-2 text-nature-600 hover:bg-nature-50 rounded-lg flex items-center text-sm">
                        <FaUser className="w-4 h-4 mr-2" />
                  {t('auth.login')}
                      </div>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <div className="px-3 py-2 bg-nature-600 text-white rounded-lg hover:bg-nature-700 flex items-center text-sm">
                        <FaPaw className="w-4 h-4 mr-2" />
                {t('auth.register')}
            </div>
                    </Link>
                  </>
                )}
                {/* Language flags for mobile */}
                <div className="relative mx-auto mt-4">
                  <button 
                    className="text-gray-600 hover:text-nature-700 transition-colors flex items-center text-sm"
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  >
                    🌐 <span className="ml-1">{i18n.language.toUpperCase()}</span>
                  </button>
                  {showLanguageDropdown && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
                        {['fr', 'en', 'es', 'ru', 'de', 'ar', 'pt', 'it', 'el'].map((lng) => (
                          <button
                            key={lng}
                            onClick={() => { handleLanguageChange(lng); setIsOpen(false); }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            <img src={`/images/${lng}.png`} alt={lng.toUpperCase()} className="h-4 w-6 mr-2" />
                            {lng.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
        )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;