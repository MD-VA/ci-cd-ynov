// // App.test.js
// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// describe('App', () => {
//   it('renders without crashing', () => {
//     render(<App />);
//   });

//   it('renders RegistrationForm component', () => {
//     const { getByPlaceholderText } = render(<App />);
//     const firstNameInput = getByPlaceholderText('First Name');
    
//     expect(firstNameInput).toBeInTheDocument();
//   });// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mocking the ToastContainer component
jest.mock('react-toastify', () => ({
  ToastContainer: jest.fn(() => null),
}));

describe('App Component Tests', () => {
  // Test 1: Renders the App component
  test('Renders the App component', () => {
    render(<App />);
    const appElement = screen.getByTestId('app-component');
    expect(appElement).toBeInTheDocument();
  });

  // Test 2: Renders the RegistrationForm component
  test('Renders the RegistrationForm component', () => {
    render(<App />);
    const registrationFormElement = screen.getByTestId('registration-form-component');
    expect(registrationFormElement).toBeInTheDocument();
  });

  // Test 3: Renders the ToastContainer component
  test('Renders the ToastContainer component', () => {
    render(<App />);
    const toastContainerElement = screen.queryByText('ToastContainer');

  });
});


// });
