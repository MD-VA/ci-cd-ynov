import './App.css';
import RegistrationForm from './Registration/RegistrationForm';

function App() {
  return (
    <div className="App" data-testid="app-component">
      <RegistrationForm data-testid="registration-form-component" />
    </div>
  );
}

export default App;