import React from 'react';
import { toast } from 'react-hot-toast';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erreur capturée:', error, errorInfo);
    toast.error('Une erreur est survenue. Veuillez réessayer.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Oups ! Quelque chose s'est mal passé
          </h1>
          <p className="text-gray-600 mb-4">
            Nous nous excusons pour ce désagrément. Veuillez rafraîchir la page ou réessayer plus tard.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Rafraîchir la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 