import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mocking the ToastContainer component
jest.mock('react-toastify', () => ({
  ToastContainer: jest.fn(() => null),
}));

describe('App Component Tests', () => {
  test('Renders the App component', () => {
    render(<App />);
    const appElement = screen.getByTestId('app-component');
    expect(appElement).toBeInTheDocument();
  });

  test('Renders the RegistrationForm component', () => {
    render(<App />);
    const registrationFormElement = screen.getByTestId('registration-form-component');
    expect(registrationFormElement).toBeInTheDocument();
  });

});


