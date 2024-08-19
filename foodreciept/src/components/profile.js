import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
   
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Get the logged-in user; assume the first user for simplicity
    const loggedInUser = users[0]; // Adjust logic based on how you determine the logged-in user
    setUser(loggedInUser);
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Cell Number:</strong> {user.phone}</p>
        </div>
      ) : (
        <p>No user information available. Please register or login first.</p>
      )}
    </div>
  );
};

export default Profile;
