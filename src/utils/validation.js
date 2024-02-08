// src/utils/validation.js
import { toast } from 'react-toastify';

export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }

  return age;
};

const displayErrorToast = (error) => {
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

export const validateRegistrationForm = (formData) => {
  const errors = {};

  // Validate first name
  if (!/^[a-zA-ZÀ-ÿ-]+$/.test(formData.firstName.trim())) {
    const error = 'Invalid first name';
    errors.firstName = error;
    displayErrorToast(error);
  }

  // Validate last name
  if (!/^[a-zA-ZÀ-ÿ-]+$/.test(formData.lastName.trim())) {
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
  const age = calculateAge(formData.dateOfBirth);
  if (age < 18) {
    const error = 'Must be at least 18 years old';
    errors.dateOfBirth = error;
    displayErrorToast(error);
  }

  // Validate city (optional, adjust as needed)
  if (!formData.city.trim()) {
    const error = 'City is required';
    errors.city = error;
    displayErrorToast(error);
  }

  // Validate postal code
  const postalCodeRegex = /^(?:[0-8]\d|9[0-8])\d{3}$/;
  if (!postalCodeRegex.test(formData.postalCode.trim())) {
    const error = 'Invalid postal code';
    errors.postalCode = error;
    displayErrorToast(error);
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
