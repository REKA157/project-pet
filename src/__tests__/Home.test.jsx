import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

describe('Home Page', () => {
  test('affiche le message de bienvenue', () => {
    render(<Home />);
    const welcomeMessage = screen.getByText(/Bienvenue sur DogMeet/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
}); 