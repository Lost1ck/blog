/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styles from './signin.module.scss';
import { userLogin } from '../../../context/LoginContext';

const SignIn = () => {
  const [userLog, setUserLog] = useState({
    email: '',
    password: '',
  });

  const { fetchLoggining } = userLogin();

  console.log(userLog);

  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { password, email } = data;

    const userData = {
      email, password,
    };

    setUserLog(userData);
    console.log(userData);
    await fetchLoggining(userData);
    reset();
  };

  return (
    <div className={styles['login-form-container']}>
      <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In</h2>
        <div className={styles['form-group']}>
          <label htmlFor="email">Email address</label>
          <input
            {...register('email', {
              required: 'Required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Try again',
              },
            })}
            type="email"
            id="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register('password', {
              required: 'Required',
              minLength: {
                value: 6,
                message: 'Wrong password',
              },
              maxLength: {
                value: 40,
                message: 'Wrong password',
              },
            })}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className={styles['login-button']}>
          Login
        </button>
        <p className={styles['signup-text']}>
          Dont have an account?
          {' '}
          <Link to="/signup" className={styles.text}>
            Sign Up.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
