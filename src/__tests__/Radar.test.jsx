import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Radar from '../pages/Radar';

// Mock des données de test
const mockDogs = [
  {
    id: 1,
    name: 'Rex',
    race: 'Berger Allemand',
    humeur: 'Joueur',
    latitude: 48.8566,
    longitude: 2.3522
  }
];

// Mock de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockDogs)
  })
);

describe('Radar Page', () => {
  beforeEach(() => {
    // Réinitialiser le mock avant chaque test
    fetch.mockClear();
  });

  test('affiche le titre de la page', async () => {
    render(<Radar />);
    const title = screen.getByText(/Chiens à proximité/i);
    expect(title).toBeInTheDocument();
  });

  test('affiche les chiens après le chargement', async () => {
    render(<Radar />);

    // Vérifier que le loader est affiché
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(screen.getByText('Rex')).toBeInTheDocument();
    });

    // Vérifier que les informations du chien sont affichées
    expect(screen.getByText('Berger Allemand')).toBeInTheDocument();
    expect(screen.getByText('Joueur')).toBeInTheDocument();
  });

  test('gère les erreurs de chargement', async () => {
    // Simuler une erreur
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Erreur de chargement'))
    );

    render(<Radar />);

    // Attendre que l'erreur soit affichée
    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de la récupération des chiens/i)).toBeInTheDocument();
    });
  });
}); 