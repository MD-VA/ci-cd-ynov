import { toast } from 'react-toastify';
import { calculateAge } from '../module';

/**
 * Display an error toast using react-toastify.
 *
 * @param {string} error - The error message to display in the toast.
 */
export const displayErrorToast = (error) => {
  toast.error(error, {
    position: 'top-right',
    autoClose: 3000, // Auto close the toast after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

/**
 * Validate the registration form data.
 *
 * @param {Object} formData - The registration form data object.
 * @param {string} formData.firstName - The first name to validate.
 * @param {string} formData.lastName - The last name to validate.
 * @param {string} formData.email - The email address to validate.
 * @param {string} formData.dateOfBirth - The date of birth to validate (in string format YYYY-MM-DD).
 * @param {string} formData.city - The city to validate.
 * @param {string} formData.postalCode - The postal code to validate.
 * @returns {Object} An object containing the validation result with `isValid` (boolean) and `errors` (object) properties.
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};

  // Validate first name
  if (!/^[a-zA-ZÀ-ÿ-'’]+$/.test(formData.firstName.trim())) {
    const error = 'Invalid first name';
    errors.firstName = error;
    displayErrorToast(error);
  }

  // Validate last name
  if (!/^[a-zA-ZÀ-ÿ-'’]+$/.test(formData.lastName.trim())) {
    const error = 'Invalid last name';
    errors.lastName = error;
    displayErrorToast(error);
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email.trim())) {
    const error = 'Invalid email address';
    errors.email = error;
    displayErrorToast(error);
  }

  // Validate date of birth
  let age;

  try {
    age = calculateAge(formData.dateOfBirth);
  } catch (error) {
    const err = 'Date is required';
    errors.dateOfBirth = err;
    displayErrorToast(err);
  }
  if (age < 18) {
    const error = 'Must be at least 18 years old';
    errors.dateOfBirth = error;
    displayErrorToast(error);
  }

  // Validate city (optional, should not be a number)
  if (!formData.city.trim()) {
    const error = 'City is required';
    errors.city = error;
    displayErrorToast(error);
  } else if (/^\d+$/.test(formData.city.trim())) {
    const error = 'City should not be a number';
    errors.city = error;
    displayErrorToast(error);
  }

  // Validate postal code
  const postalCodeRegex = /^[0-9]{5}$/;
  if (!postalCodeRegex.test(formData.postalCode.trim())) {
    const error = 'Invalid postal code';
    errors.postalCode = error;
    displayErrorToast(error);
  }

  // Return validation result
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
