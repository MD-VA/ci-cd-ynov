import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';
import '@testing-library/jest-dom/extend-expect';

describe('RegistrationForm Integration Tests', () => {
  test('renders RegistrationForm component', () => {
    render(<RegistrationForm />);
  });

  test('Save button is initially disabled', () => {
    render(<RegistrationForm />);
    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeDisabled();
  });

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

  test('Submits form with valid data', () => {
    render(<RegistrationForm />);
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
  });

test('Disables the Save button if fields are not filled', () => {
  render(<RegistrationForm />);
  const saveButton = screen.getByText('Save');

  expect(saveButton).toBeDisabled();

  fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });

  expect(saveButton).toBeDisabled();
});

test('Saves data in local storage and resets fields after successful submission', () => {
  render(<RegistrationForm />);
  const saveButton = screen.getByText('Save');

  fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Date of Birth'), { target: { value: '1990-01-01' } });
  fireEvent.change(screen.getByPlaceholderText('City'), { target: { value: 'Paris' } });
  fireEvent.change(screen.getByPlaceholderText('Postal Code'), { target: { value: '08000' } });
  fireEvent.click(saveButton);

  console.log("[LocalStorage]", JSON.parse(localStorage.getItem('user')))
  expect(JSON.parse(localStorage.getItem('user'))).toEqual({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '1990-01-01',
    city: 'Paris',
    postalCode: '08000'
  });

  expect(screen.getByPlaceholderText('First Name').value).toBe('');
  expect(screen.getByPlaceholderText('Last Name').value).toBe('');
  expect(screen.getByPlaceholderText('Email').value).toBe('');
  expect(screen.getByPlaceholderText('Date of Birth').value).toBe('');
  expect(screen.getByPlaceholderText('City').value).toBe('');
  expect(screen.getByPlaceholderText('Postal Code').value).toBe('');
});

test('Displays error toaster and corresponding errors in red', async  () => {
  render(<RegistrationForm />);
  const saveButton = screen.getByText('Save');

  fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: '123' } });
  fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: '$$' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalid-email' } });
  fireEvent.change(screen.getByPlaceholderText('Date of Birth'), { target: { value: '2010-01-01' } });
  fireEvent.change(screen.getByPlaceholderText('City'), { target: { value: '12312' } });
  fireEvent.change(screen.getByPlaceholderText('Postal Code'), { target: { value: 'invalid-code' } });

  expect(saveButton).not.toBeDisabled();
  await act(async () => {
    fireEvent.click(saveButton);
  });
  await new Promise(resolve => setTimeout(resolve, 500));


  expect(screen.getByText('Invalid first name')).toBeInTheDocument();
  expect(screen.getByText('Invalid last name')).toBeInTheDocument();
  expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  expect(screen.getByText('Must be at least 18 years old')).toBeInTheDocument();
  expect(screen.getByText('City should not be a number')).toBeInTheDocument();
  expect(screen.getByText('Invalid postal code')).toBeInTheDocument();

});

test('Check if success toast is displayed',async () => {
  render(<RegistrationForm />);
  const saveButton = screen.getByText('Save');

  fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Date of Birth'), { target: { value: '1990-01-01' } });
  fireEvent.change(screen.getByPlaceholderText('City'), { target: { value: 'Paris' } });
  fireEvent.change(screen.getByPlaceholderText('Postal Code'), { target: { value: '08000' } });
  fireEvent.click(saveButton);

  await new Promise(resolve => setTimeout(resolve, 500));

  expect(screen.getByText('Registration successful!')).toBeInTheDocument();

  expect(screen.getByPlaceholderText('First Name').value).toBe('');
  expect(screen.getByPlaceholderText('Last Name').value).toBe('');
  expect(screen.getByPlaceholderText('Email').value).toBe('');
  expect(screen.getByPlaceholderText('Date of Birth').value).toBe('');
  expect(screen.getByPlaceholderText('City').value).toBe('');
  expect(screen.getByPlaceholderText('Postal Code').value).toBe('');
});

});
