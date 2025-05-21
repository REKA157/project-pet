import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaDog, FaHeart, FaChartBar, FaBell, FaCog, FaRobot, FaMicrophone, FaComments, FaBrain, FaHeartbeat, FaGraduationCap, FaUsers } from 'react-icons/fa';
import { MdGraphicEq } from 'react-icons/md';

const tabs = [
  { key: 'profile', label: 'Profil', icon: <FaUser /> },
  { key: 'pets', label: 'Animaux', icon: <FaDog /> },
  { key: 'favorites', label: 'Favoris', icon: <FaHeart /> },
  { key: 'stats', label: 'Statistiques', icon: <FaChartBar /> },
  { key: 'notifications', label: 'Notifications', icon: <FaBell /> },
  { key: 'ia', label: 'IA', icon: <FaRobot /> },
  { key: 'settings', label: 'Paramètres', icon: <FaCog /> },
];

const iaFeatures = [
  { label: 'Assistant IA', icon: <FaBrain />, link: '/SmartAssistant', desc: "Posez vos questions, obtenez des conseils personnalisés pour vos animaux." },
  { label: 'Chat vocal', icon: <FaMicrophone />, link: '/VoiceAssistant', desc: "Discutez avec l'IA en vocal pour des réponses instantanées." },
  { label: 'PetSoundChat', icon: <MdGraphicEq />, link: '/PetSoundChat', desc: 'Analysez les sons de vos animaux et recevez des interprétations IA.' },
  { label: 'Chat IA', icon: <FaComments />, link: '/Chat', desc: "Discutez par écrit avec l'IA pour tout sujet animalier." },
];

const iaHistory = [
  { date: '2024-06-01', type: 'Assistant IA', content: 'Conseil nutrition pour Max.', status: 'completed' },
  { date: '2024-06-02', type: 'Chat vocal', content: 'Réponse sur la vaccination.', status: 'completed' },
  { date: '2024-06-03', type: 'PetSoundChat', content: "Analyse d'un aboiement.", status: 'completed' },
  { date: '2024-06-04', type: 'Assistant IA', content: 'Programme d\'exercices pour Luna.', status: 'completed' },
  { date: '2024-06-05', type: 'Chat IA', content: 'Question sur le comportement de Rocky.', status: 'in_progress' },
  { date: '2024-06-06', type: 'PetSoundChat', content: 'Analyse des ronflements de Bella.', status: 'scheduled' },
];

const iaStats = {
  totalInteractions: 156,
  averageResponseTime: '2.3s',
  mostUsedFeature: 'Assistant IA',
  satisfactionRate: '94%',
  monthlyUsage: [
    { month: 'Jan', count: 45 },
    { month: 'Fév', count: 52 },
    { month: 'Mar', count: 38 },
    { month: 'Avr', count: 48 },
    { month: 'Mai', count: 62 },
    { month: 'Juin', count: 28 },
  ],
  featureUsage: [
    { name: 'Assistant IA', percentage: 45 },
    { name: 'Chat vocal', percentage: 25 },
    { name: 'PetSoundChat', percentage: 20 },
    { name: 'Chat IA', percentage: 10 },
  ],
};

const iaSolutions = {
  existing: [
    {
      name: 'SmartAssistant',
      description: 'Assistant IA intelligent pour conseils personnalisés',
      icon: <FaBrain />,
      status: 'active',
      usage: '45%',
      link: '/SmartAssistant'
    },
    {
      name: 'VoiceAssistant',
      description: 'Assistant vocal pour interactions naturelles',
      icon: <FaMicrophone />,
      status: 'active',
      usage: '25%',
      link: '/VoiceAssistant'
    },
    {
      name: 'PetSoundChat',
      description: 'Analyse des sons et comportements animaux',
      icon: <MdGraphicEq />,
      status: 'active',
      usage: '20%',
      link: '/PetSoundChat'
    },
    {
      name: 'Chat IA',
      description: 'Chat textuel pour questions et réponses',
      icon: <FaComments />,
      status: 'active',
      usage: '10%',
      link: '/Chat'
    }
  ],
  proposed: [
    {
      name: 'IA Santé',
      description: 'Analyse prédictive de la santé animale',
      icon: <FaHeartbeat />,
      status: 'coming_soon',
      link: '/Health'
    },
    {
      name: 'IA Éducation',
      description: 'Programme d\'éducation personnalisé',
      icon: <FaGraduationCap />,
      status: 'coming_soon',
      link: '/Education'
    },
    {
      name: 'IA Social',
      description: 'Recommandations de rencontres entre animaux',
      icon: <FaUsers />,
      status: 'coming_soon',
      link: '/Community'
    }
  ]
};

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [iaLevel, setIaLevel] = useState('standard');
  const [iaSuggestions, setIaSuggestions] = useState(true);
  const [iaNotifications, setIaNotifications] = useState(true);
  const [iaLanguage, setIaLanguage] = useState('fr');
  const [iaVoice, setIaVoice] = useState('female');
  const [iaAutoTranslate, setIaAutoTranslate] = useState(false);
  const [iaDataCollection, setIaDataCollection] = useState(true);
  const [showSolutions, setShowSolutions] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Mon Compte</h1>
      <div className="flex gap-4 mb-8 justify-center">
        {tabs.map(tab => (
          <motion.button
            key={tab.key}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === tab.key
                ? 'bg-nature-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-nature-100'
            }`}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 min-h-[400px]">
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Profil utilisateur</h2>
            {/* À compléter avec les infos utilisateur */}
            <p>Nom, email, photo, etc.</p>
          </div>
        )}
        {activeTab === 'pets' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Mes animaux</h2>
            {/* À compléter avec la gestion des animaux */}
            <p>Liste, ajout, modification, suppression…</p>
          </div>
        )}
        {activeTab === 'favorites' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Favoris</h2>
            {/* À compléter avec la liste des favoris */}
            <p>Contacts favoris, accès rapide…</p>
          </div>
        )}
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
            {/* À compléter avec les stats de partage */}
            <p>Nombre de partages, durée moyenne, contacts actifs…</p>
          </div>
        )}
        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            {/* À compléter avec la liste des notifications */}
            <p>Alertes, messages, invitations…</p>
          </div>
        )}
        {activeTab === 'ia' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaRobot className="text-nature-600" /> Intelligence Artificielle
            </h2>

            {/* Statistiques d'utilisation */}
            <div className="mb-6 bg-nature-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Statistiques d'utilisation</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Total interactions</p>
                  <p className="text-2xl font-bold text-nature-600">{iaStats.totalInteractions}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Temps de réponse moyen</p>
                  <p className="text-2xl font-bold text-nature-600">{iaStats.averageResponseTime}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Fonction la plus utilisée</p>
                  <p className="text-2xl font-bold text-nature-600">{iaStats.mostUsedFeature}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Taux de satisfaction</p>
                  <p className="text-2xl font-bold text-nature-600">{iaStats.satisfactionRate}</p>
                </div>
              </div>
            </div>

            {/* Solutions IA */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Solutions IA</h3>
                <button
                  onClick={() => setShowSolutions(!showSolutions)}
                  className="text-nature-600 hover:text-nature-700"
                >
                  {showSolutions ? 'Réduire' : 'Voir tout'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Solutions existantes */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h4 className="font-medium mb-3 text-gray-800">Solutions actives</h4>
                  <div className="space-y-3">
                    {iaSolutions.existing.map(solution => (
                      <a
                        key={solution.name}
                        href={solution.link}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-nature-50 transition"
                      >
                        <span className="text-2xl text-nature-600">{solution.icon}</span>
                        <div className="flex-grow">
                          <p className="font-semibold text-gray-900">{solution.name}</p>
                          <p className="text-sm text-gray-600">{solution.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{solution.usage}</span>
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Solutions proposées */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h4 className="font-medium mb-3 text-gray-800">Solutions à venir</h4>
                  <div className="space-y-3">
                    {iaSolutions.proposed.map(solution => (
                      <div
                        key={solution.name}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-2xl text-gray-400">{solution.icon}</span>
                        <div className="flex-grow">
                          <p className="font-semibold text-gray-900">{solution.name}</p>
                          <p className="text-sm text-gray-600">{solution.description}</p>
                        </div>
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                          Bientôt disponible
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Graphique d'utilisation */}
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium mb-4">Utilisation mensuelle</h3>
              <div className="h-48 flex items-end gap-2">
                {iaStats.monthlyUsage.map(month => (
                  <div key={month.month} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-nature-600 rounded-t"
                      style={{ height: `${(month.count / 62) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2">{month.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommandations personnalisées */}
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium mb-4">Recommandations pour vous</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-nature-50 rounded-lg">
                  <FaBrain className="text-2xl text-nature-600" />
                  <div>
                    <p className="font-medium text-gray-900">Essayez l'Assistant IA</p>
                    <p className="text-sm text-gray-600">Basé sur vos interactions récentes, l'Assistant IA pourrait vous aider avec les questions de santé de Max.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-nature-50 rounded-lg">
                  <FaMicrophone className="text-2xl text-nature-600" />
                  <div>
                    <p className="font-medium text-gray-900">Testez le Chat vocal</p>
                    <p className="text-sm text-gray-600">Parfait pour les questions rapides pendant vos promenades avec Luna.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fonctionnalités IA */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Fonctionnalités IA disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {iaFeatures.map(f => (
                  <a key={f.label} href={f.link} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-nature-50 transition">
                    <span className="text-2xl text-nature-600">{f.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{f.label}</p>
                      <p className="text-sm text-gray-600">{f.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Historique des interactions */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Historique de vos interactions IA</h3>
              <ul className="space-y-2">
                {iaHistory.map((h, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-nature-600"><FaRobot /></span>
                    <span className="text-xs text-gray-500 w-20">{h.date}</span>
                    <span className="font-medium text-gray-800">{h.type}</span>
                    <span className="text-gray-600 flex-grow">{h.content}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      h.status === 'completed' ? 'bg-green-100 text-green-800' :
                      h.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {h.status === 'completed' ? 'Terminé' :
                       h.status === 'in_progress' ? 'En cours' : 'Planifié'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Paramètres IA */}
            <div>
              <h3 className="font-medium mb-2">Paramètres IA</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-700">Niveau d'assistance</label>
                    <select
                      value={iaLevel}
                      onChange={e => setIaLevel(e.target.value)}
                      className="border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="minimal">Minimal</option>
                      <option value="standard">Standard</option>
                      <option value="avancé">Avancé</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-700">Langue</label>
                    <select
                      value={iaLanguage}
                      onChange={e => setIaLanguage(e.target.value)}
                      className="border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-700">Voix IA</label>
                    <select
                      value={iaVoice}
                      onChange={e => setIaVoice(e.target.value)}
                      className="border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="female">Féminine</option>
                      <option value="male">Masculine</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-700">Suggestions intelligentes</label>
                    <input
                      type="checkbox"
                      checked={iaSuggestions}
                      onChange={() => setIaSuggestions(v => !v)}
                      className="w-5 h-5 accent-nature-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-700">Notifications IA</label>
                    <input
                      type="checkbox"
                      checked={iaNotifications}
                      onChange={() => setIaNotifications(v => !v)}
                      className="w-5 h-5 accent-nature-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-700">Traduction automatique</label>
                    <input
                      type="checkbox"
                      checked={iaAutoTranslate}
                      onChange={() => setIaAutoTranslate(v => !v)}
                      className="w-5 h-5 accent-nature-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-gray-700">Collecte de données</label>
                    <input
                      type="checkbox"
                      checked={iaDataCollection}
                      onChange={() => setIaDataCollection(v => !v)}
                      className="w-5 h-5 accent-nature-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Paramètres</h2>
            {/* À compléter avec les paramètres de confidentialité, préférences, sécurité */}
            <p>Confidentialité, préférences, sécurité…</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account; 