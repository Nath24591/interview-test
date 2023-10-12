import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const fetchProfileData = async (token) => {
    try {
      const response = await fetch('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching profile data');
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleTokenError = (message) => {
    setError(message);
    logoutHandler();
  };

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // If token is missing, redirect to login
    if (!token) {
      handleTokenError('Token is missing. Redirecting to login...');
      return;
    }

    // If token is invalid (hardcoded), redirect to login
    if (token !== '123') {
      handleTokenError('Invalid token. Redirecting to login...');
      return;
    }

    // Fetch profile data if token is valid
    fetchProfileData(token);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Profile</h1>
      {error ? (
        <p>{error}</p>
      ) : profile ? (
        <div className={styles.profile}>
          <img src="/images/sample-profile.jpg" alt="Sample Img" className={styles.profileImage} />
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {profile && <button onClick={logoutHandler} className={styles.logoutButton}>Logout</button>}
    </div>
  );
};

export default ProfilePage;
