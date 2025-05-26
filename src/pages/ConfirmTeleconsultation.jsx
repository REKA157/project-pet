import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmTeleconsultation = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const vet = params.get('vet');
  const time = params.get('time');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirmation de la téléconsultation</h2>
        <div className="mb-4">
          <p className="text-lg text-gray-700 mb-2">Vétérinaire : <span className="font-semibold">{vet}</span></p>
          <p className="text-lg text-gray-700 mb-2">Créneau choisi : <span className="font-semibold">{time}</span></p>
        </div>
        <p className="text-green-600 font-medium mb-2">Un lien de visio vous sera envoyé par e-mail.</p>
        <p className="text-gray-500 text-sm">Merci pour votre confiance !</p>
      </div>
    </div>
  );
};

export default ConfirmTeleconsultation; 