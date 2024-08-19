import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Recipe from './components/recipe';
import './components/register.css';
import LoginForm from './components/login';
import Profile from './components/profile';
import AddRecipe from './components/addrecipe'; 



const Register = ({onRegister}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Users:', users);

    if (users.find(user => user.username === username)) {
      alert('Username Exists');
    } else if (users.find(user => user.email === email)) {
      alert('Email Already Registered');
    } else if (!/^\d{10}$/.test(phone)) {
      alert('Enter a Valid 10-digit Phone Number');
    } else {
      const newUser = { username, password, email, phone };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration Successful!');
     
    }
   navigate('/login')
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
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cellnumber">Cell Number:</label>
          <input
            type="tel"
            id="cellnumber"
            value={phone} onChange={(e) => setPhone(e.target.value)} 
            required maxLength={10}
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
        <Route path="/" element={<Register />} /> 
        <Route path="/userContext" element={<userContext />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/addrecipe" element={<AddRecipe  />} />
      </Routes>
    </Router>
  );
};

export default App;
