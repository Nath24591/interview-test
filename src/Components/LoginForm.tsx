import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './LoginForm.module.css';
import { login } from '../../services/loginService';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const redirect = (path: string) => {
    router.push(path);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loggedIn = await login(username, password);

      if (loggedIn) {
        redirect("/profile");
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <button type="submit" className={styles.button}>
          Login
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
