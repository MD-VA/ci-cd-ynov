import { validateRegistrationForm, displayErrorToast } from '../utils/validation';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('Validation Functions Tests', () => {


  // Test displayErrorToast function
  test('displayErrorToast calls toast.error with the correct parameters', () => {
    const errorMessage = 'Test error message';
    displayErrorToast(errorMessage);
    expect(require('react-toastify').toast.error).toHaveBeenCalledWith(errorMessage, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });

  // Test validateRegistrationForm function - Valid data
  test('validateRegistrationForm returns the correct validation result for valid data', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dateOfBirth: '1990-01-01',
      city: 'Paris',
      postalCode: '10001',
    };
    const validationResult = validateRegistrationForm(formData);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toEqual({});
  });

  // Test validateRegistrationForm function - Invalid data
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

  // Additional test for validateRegistrationForm function - Edge case: Empty data
  test('validateRegistrationForm returns the correct validation result for empty data', () => {
    const formData = {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      city: '',
      postalCode: '',
    };
    const validationResult = validateRegistrationForm(formData);
    console.log("[ValidationResut]", validationResult)
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual({
        firstName: 'Invalid first name',
        lastName: 'Invalid last name',
        dateOfBirth: 'Date is required',
        email: 'Invalid email address',
        city: 'City is required',
        postalCode: 'Invalid postal code'
    });
  });

  // Additional test for validateRegistrationForm function - Edge case: Valid city with leading/trailing spaces
  test('validateRegistrationForm returns the correct validation result for a valid city with leading/trailing spaces', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dateOfBirth: '1990-01-01',
      city: 'Paris',
      postalCode: '75001',
    };
    const validationResult = validateRegistrationForm(formData);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toEqual({});
  });

  test('validateRegistrationForm returns the correct validation result when the city is a number', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dateOfBirth: '1990-01-01',
      city: '123', // City is a number
      postalCode: '75001',
    };
    const validationResult = validateRegistrationForm(formData);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual({
      city: 'City should not be a number',
    });
  });

  test('validateRegistrationForm firstname and lastname if they were numbers', () => {
    const formData = {
      firstName: '2323',
      lastName: 'Doe2323',
      email: 'john.doe@example.com',
      dateOfBirth: '1990-01-01',
      city: 'Paris', // City is a number
      postalCode: '75001',
    };
    const validationResult = validateRegistrationForm(formData);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual({
      firstName: 'Invalid first name',
      lastName: 'Invalid last name',
    });
  });

  test('validateRegistrationForm lastname should be invalid contains special catacter', () => {
    const formData = {
      firstName: 'Fran-l',
      lastName: 'Do@e',
      email: 'john.doe@example.com',
      dateOfBirth: '1990-01-01',
      city: 'Paris', // City is a number
      postalCode: '75001',
    };
    const validationResult = validateRegistrationForm(formData);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual({
      lastName: 'Invalid last name',
    });
  });

  test('validateRegistrationForm firstname and lastname valid names with accents, hyphens, and apostrophes', () => {
    const formData = {
      firstName: 'Jean-Paul',
      lastName: 'L\'Éclair',
      email: 'jean.paul@example.com',
      dateOfBirth: '1990-01-01',
      city: 'Paris',
      postalCode: '75001',
    };
    const validationResult = validateRegistrationForm(formData);
    expect(validationResult.isValid).toBe(true);
    expect(validationResult.errors).toEqual({});
  });

  test('validateRegistrationForm firstname and lastname invalid names with special characters and numbers', () => {
    const formData = {
      firstName: 'Alice@123',
      lastName: 'Smith#',
      email: 'alice.smith@example.com',
      dateOfBirth: '1990-01-01',
      city: 'Paris',
      postalCode: '75001',
    };
    const validationResult = validateRegistrationForm(formData);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual({
      firstName: 'Invalid first name',
      lastName: 'Invalid last name',
    });
  });

  test('validateRegistrationForm firstname and lastname empty strings', () => {
    const formData = {
      firstName: '',
      lastName: '',
      email: 'john.doe@example.com',
      dateOfBirth: '1990-01-01',
      city: 'Paris',
      postalCode: '75001',
    };
    const validationResult = validateRegistrationForm(formData);
    expect(validationResult.isValid).toBe(false);
    expect(validationResult.errors).toEqual({
      firstName: 'Invalid first name',
      lastName: 'Invalid last name',
    });
  });

});
