import React from 'react';
import { useUser } from '../context/UserContext'; // Import useUser from context

const Profile = () => {
  const { user } = useUser(); // Get user from context

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Cell Number:</strong> {user.cellNumber}</p>
        </div>
      ) : (
        <p>No user information available. Please register first.</p>
      )}
    </div>
  );
};

export default Profile;

