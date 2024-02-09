import './App.css';
import RegistrationForm from './Registration/RegistrationForm';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App" data-testid="app-component">
      <RegistrationForm data-testid="registration-form-component" />
      <ToastContainer />
    </div>
  );
}

export default App;