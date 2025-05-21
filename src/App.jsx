import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Radar from './pages/Radar';
import DogSwipe from './pages/DogSwipe';
import AudioUpload from './pages/AudioUpload';
import GeoTracker from './pages/GeoTracker';
import VoiceAssistant from './pages/VoiceAssistant';
import Footer from './components/Footer';
import EmergencyButton from './components/EmergencyButton';
import FeedbackButton from './components/FeedbackButton';
import { Toaster } from 'react-hot-toast';
import NotificationListener from './components/NotificationListener';
import Home from './pages/Home';
import SmartAssistant from './pages/SmartAssistant';
import NotFound from './pages/NotFound';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Toaster />
        <NotificationListener />
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/app" element={<PrivateRoute />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="radar" element={<Radar />} />
                  <Route path="meet" element={<DogSwipe />} />
                  <Route path="upload-audio" element={<AudioUpload />} />
                  <Route path="geotracker" element={<GeoTracker />} />
                  <Route path="assistant" element={<SmartAssistant />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <EmergencyButton />
          <FeedbackButton />
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;