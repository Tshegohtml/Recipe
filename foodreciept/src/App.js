import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Recipe from './components/recipe';
import './components/register.css';
import LoginForm from './components/login';



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
    navigate('/login');
  };

  return (
    <div className="App">
      <div className='logo'></div>
      <h1>Register</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input className='user'
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

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/recipes" element={<Recipe recipes={recipes} />} />
        {/* <Route path="/recipes/:category" element={<Recipe recipes={recipes} />} /> Handle category */}
        <Route path="/" element={<Register />} /> {/* Default route */}
        
      </Routes>
    </Router>
  );
};

export default App;
