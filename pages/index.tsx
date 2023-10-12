"use client"
import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import LoginForm from '../src/Components/LoginForm';

const Home: React.FC = () => {

  //If user is already logged in, go straight to profile page
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/profile';
    }
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Welcome to the Connexin Demo App!</h1>
        {/* Render the login form component */}
        <LoginForm />
    </main>
  );
};

export default Home;
