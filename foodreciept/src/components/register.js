import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Ensure this CSS file is correctly imported

const Register = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [cellNumber, setCellNumber] = React.useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCellNumberChange = (e) => setCellNumber(e.target.value);

  const handleRegister = () => {
    alert(`Registered with Username: ${username}, Password: ${password}, Email: ${email}, Cell Number: ${cellNumber}`);
    navigate('/recipes');
  };

  return (
    <div className="App">
      <h1>Register</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="cellnumber">Cell Number:</label>
          <input
            type="tel"
            id="cellnumber"
            value={cellNumber}
            onChange={handleCellNumberChange}
          />
        </div>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
