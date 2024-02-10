// src/components/RegistrationForm.js
import React, { useState, useEffect } from 'react';
import { validateRegistrationForm, calculateAge } from '../utils/validation';
import './RegistrationForm.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    city: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = () => {
    const validationResult = validateRegistrationForm(formData);
    if (validationResult.isValid) {
      localStorage.setItem('user', JSON.stringify(formData));
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        city: '',
        postalCode: '',
      });
      // Show success toaster
      setErrors({});
    } else {
      setErrors(validationResult.errors);
    }
  };

  useEffect(() => {
    const isDisabled = Object.values(formData).some((value) => value === '');
    setIsButtonDisabled(isDisabled);
  }, [formData]);

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
      {/* {errors.firstName && (
        <div className="error-message">{errors.firstName}</div>
      )} */}

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