import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <FaPaw className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-semibold">VetCare</span>
            </div>
            <p className="text-gray-400">
              Des soins vétérinaires innovants pour votre animal
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-400 hover:text-white">Téléconsultation</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white">Rendez-vous</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white">Urgences</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Communauté</h3>
            <ul className="space-y-2">
              <li><Link to="/community" className="text-gray-400 hover:text-white">Forum</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-white">Événements</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 VetCare. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;