// src/components/RegistrationForm.js
import React, { useState, useEffect } from 'react';
import { validateRegistrationForm } from '../utils/validation';
import './RegistrationForm.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

/**
 * RegistrationForm component handles user registration.
 * 
 * @component
 */
const RegistrationForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    city: '',
    postalCode: '',
  });

  // State to manage form errors
  const [errors, setErrors] = useState({});

  // State to manage button disable/enable based on form completeness
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  /**
   * Handle input changes in the form fields.
   *
   * @param {Object} e - The event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  /**
   * Display success toaster with specified message.
   *
   * @param {string} message - The success message to display.
   */
  const displayToast = (message) => {
    toast.success(message, {
      position: 'bottom',
      autoClose: 3000, // Duration for which the toast is shown (in milliseconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  /**
   * Handle form submission.
   */
  const handleSubmit = () => {
    const validationResult = validateRegistrationForm(formData);

    // Check if the form is valid
    if (validationResult.isValid) {
      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify(formData));

      // Clear form fields
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        city: '',
        postalCode: '',
      });

      // Show success toaster
      displayToast('Registration successful!');

      // Clear errors
      setErrors({});
    } else {
      // Set form errors if validation fails
      setErrors(validationResult.errors);
    }
  };

  /**
   * Update button disable/enable based on form completeness.
   */
  useEffect(() => {
    const isDisabled = Object.values(formData).some((value) => value === '');
    setIsButtonDisabled(isDisabled);
  }, [formData]);

  /**
   * Render the registration form component.
   */
  return (
    <div
      data-testid='registration-form-component'
      className='registration-form'
    >
      <input
        type='text'
        name='firstName'
        value={formData.firstName}
        onChange={handleInputChange}
        placeholder='First Name'
      />

      <input
        type='text'
        name='lastName'
        value={formData.lastName}
        onChange={handleInputChange}
        placeholder='Last Name'
      />

      <input
        type='text'
        name='email'
        value={formData.email}
        onChange={handleInputChange}
        placeholder='Email'
      />

      <input
        type='date'
        name='dateOfBirth'
        value={formData.dateOfBirth}
        onChange={handleInputChange}
        placeholder='Date of Birth'
      />

      <input
        type='text'
        name='city'
        value={formData.city}
        onChange={handleInputChange}
        placeholder='City'
      />

      <input
        type='text'
        name='postalCode'
        value={formData.postalCode}
        onChange={handleInputChange}
        placeholder='Postal Code'
      />

      <button
        className='button'
        onClick={handleSubmit}
        disabled={isButtonDisabled}
      >
        Save
      </button>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
