// validation.test.js
import { calculateAge, validateRegistrationForm } from '../utils/validation';
import { displayErrorToast } from '../utils/validation'; // Export this function from validation.js

// Mocking the toast.error function
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('Validation Functions Tests', () => {
  // Test calculateAge function
  test('calculateAge returns the correct age', () => {
    const today = new Date();
    const birthDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());
    const age = calculateAge(birthDate.toISOString().split('T')[0]);
    expect(age).toBe(20);
  });

  // Test displayErrorToast function
//   test('displayErrorToast calls toast.error with the correct parameters', () => {
//     const errorMessage = 'Test error message';
//     displayErrorToast(errorMessage);
//     expect(require('react-toastify').toast.error).toHaveBeenCalledWith(errorMessage, {
//       position: 'top-right',
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   });

  // Test validateRegistrationForm function
  test('validateRegistrationForm returns the correct validation result for valid data', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dateOfBirth: '1990-01-01',
      city: 'New York',
      postalCode: '10001',
    };
    const validationResult = validateRegistrationForm(formData);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toEqual({});
  });

  // Test validateRegistrationForm function with invalid data
  test('validateRegistrationForm returns the correct validation result for invalid data', () => {
    const formData = {
      firstName: '',
      lastName: '123', // Invalid last name
      email: 'invalid-email', // Invalid email
      dateOfBirth: '2010-01-01', // Age less than 18
      city: '', // Empty city
      postalCode: '123', // Invalid postal code
    };
    const validationResult = validateRegistrationForm(formData);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual({
      firstName: 'Invalid first name',
      lastName: 'Invalid last name',
      email: 'Invalid email address',
      dateOfBirth: 'Must be at least 18 years old',
      city: 'City is required',
      postalCode: 'Invalid postal code',
    });
  });
});
