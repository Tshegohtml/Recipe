import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.username === formData.username && user.password === formData.password);

    if (user) {
      // Optionally store user info in sessionStorage or pass it as state
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/recipes');
    } else {
      alert('Invalid Username or Password');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <div className='logo'></div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;


