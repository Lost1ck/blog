/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './signin.module.scss';

const SignIn = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({});

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
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Try again';
    }
    if (!formData.password || formData.password.length < 6 || formData.password.length > 40) {
      newErrors.password = 'Wrong password';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log('Данные формы:', formData); // server
      setFormData({
        email: '',
        password: '',
      });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className={styles['login-form-container']}>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className={styles['form-group']}>
          <label htmlFor="email">Email address</label>
          <input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <button type="submit" className={styles['login-button']}>Login</button>
        <p className={styles['signup-text']}>
          Dont have an account?
          {' '}
          <Link to="/signup" className={styles.text}>Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
