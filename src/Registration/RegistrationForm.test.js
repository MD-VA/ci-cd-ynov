import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';
import { validateRegistrationForm } from '../utils/validation';

describe('RegistrationForm Integration Tests', () => {
  // Test 1: Rendering the form
  test('renders RegistrationForm component', () => {
    render(<RegistrationForm />);
    // Add assertions if needed
  });

  // Test 2: Check if the Save button is initially disabled
  test('Save button is initially disabled', () => {
    render(<RegistrationForm />);
    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeDisabled();
  });

  // Test 3: Filling out the form and enabling the Save button
  test('Enables Save button when form is filled', () => {
    render(<RegistrationForm />);
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const dobInput = screen.getByPlaceholderText('Date of Birth');
    const cityInput = screen.getByPlaceholderText('City');
    const postalCodeInput = screen.getByPlaceholderText('Postal Code');
    const saveButton = screen.getByText('Save');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(dobInput, { target: { value: '1990-01-01' } });
    fireEvent.change(cityInput, { target: { value: 'New York' } });
    fireEvent.change(postalCodeInput, { target: { value: '10001' } });

    expect(saveButton).not.toBeDisabled();
  });

  // Test 4: Submitting the form with valid data
  test('Submits form with valid data', () => {
    render(<RegistrationForm />);
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    // Add assertions for localStorage and form reset
  });

  // Add more tests covering various scenarios, edge cases, and error handling
});
