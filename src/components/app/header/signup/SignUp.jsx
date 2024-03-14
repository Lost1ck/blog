import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './signup.module.scss';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    isAgreementChecked: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {
      name, value, checked, type,
    } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username || formData.username.length <= 6 || formData.username.length > 20) {
      newErrors.username = 'username must be at least 6 characters and not more than 20 characters';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'write your email address';
    }
    if (!formData.password || formData.password.length < 6 || formData.password.length > 40) {
      newErrors.password = 'Your password needs to be at least 6 characters.';
    }
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords must match';
    }
    if (!formData.isAgreementChecked) {
      newErrors.isAgreementChecked = 'you need to agree to this agreement';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log('Данные формы:', formData); // server
      setFormData({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        isAgreementChecked: false,
      });
      // Сброс ошибок
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className={styles['form-container']}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create new account</h2>
        <div className={styles['input-group']}>
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            // className={styles.input}
            className={`${styles.input} ${errors.username ? styles['input-error'] : ''}`}
          />
          {errors.username && <p className={styles['error-message']}>{errors.username}</p>}
        </div>
        <div className={styles['input-group']}>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={styles.input}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles['input-group']}>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={styles.input}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <div className={styles['input-group']}>
          <p>Repeat password</p>
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            placeholder="Password"
            className={styles.input}
          />
          {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword}</p>}
        </div>
        <div className={styles['checkbox-group']}>
          <label htmlFor="agreement" className={styles['checkbox-label']}>
            <input
              type="checkbox"
              name="isAgreementChecked"
              checked={formData.isAgreementChecked}
              onChange={handleChange}
              id="agreement"
              className={styles.checkbox}
            />
            I agree to the processing of my personal
            information
          </label>
          {errors.isAgreementChecked && <p className={styles.error}>{errors.isAgreementChecked}</p>}
        </div>
        <button
          type="submit"
          className={styles['submit-button']}
          disabled={!formData.isAgreementChecked}
        >
          Создать
        </button>
        <p className={styles.signIn}>
          Already have an account?
          {' '}
          <Link to="/signin" className={styles['signIn-link']}>Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
