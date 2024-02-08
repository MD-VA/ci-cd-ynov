import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import RegistrationForm from './Registration/RegistrationForm';
import {ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <RegistrationForm/>
      <ToastContainer />
    </div>
  );
}

export default App;
