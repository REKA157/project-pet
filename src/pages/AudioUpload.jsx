import React, { useState } from 'react';

const AudioUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'audio/wav') {
      setSelectedFile(file);
      setError('');
    } else {
      setSelectedFile(null);
      setError('Veuillez sélectionner un fichier .wav valide');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('audio', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/analyze-audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'analyse');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      joy: 'bg-yellow-100 text-yellow-800',
      fear: 'bg-red-100 text-red-800',
      alert: 'bg-orange-100 text-orange-800',
      neutral: 'bg-gray-100 text-gray-800',
    };
    return colors[emotion] || 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Analyse d'émotion audio</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sélectionnez un fichier audio (.wav)
            </label>
            <input
              type="file"
              accept="audio/wav"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">
                Fichier sélectionné : {selectedFile.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!selectedFile || isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              !selectedFile || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
          >
            {isLoading ? 'Analyse en cours...' : 'Analyser'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Résultat de l'analyse</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Émotion détectée :</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEmotionColor(result.emotion)}`}>
                  {result.emotion}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Confiance :</span>
                <span className="text-gray-800 font-medium">
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUpload; 