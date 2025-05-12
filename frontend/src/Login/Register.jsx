import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data.message || 'Error registering');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.page}>
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className={styles.input}
          />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={styles.input}
          />
        <div className={styles.buttonContainer}>
          <button type="submit" className={`${styles.button} ${styles.registerButton}`} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <button type="button" onClick={handleBackToLogin} className={`${styles.button} ${styles.loginButton}`} disabled={loading}>
            Back to Login
          </button>
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
    </div>
  );
};

export default Register;