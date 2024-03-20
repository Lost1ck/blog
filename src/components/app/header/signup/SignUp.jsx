/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styles from './signup.module.scss';
import { useRegistration } from '../../../context/RegistrationContext';

const SignUp = () => {
  const {
    register, handleSubmit, watch, formState: { errors }, reset,
  } = useForm();
  const agreement = watch('agreement', false);
  const { setUserReg, fetchRegistration } = useRegistration();

  const onSubmit = async (data) => {
    const { username, password, email } = data;

    const userData = {
      username, email, password,
    };

    setUserReg(userData);
    await fetchRegistration(userData);
    reset();
  };

  return (
    <div className={styles['form-container']}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Create new account</h2>

        <div className={styles['input-group']}>
          <p>Username</p>
          <input
            {...register('username', { required: true, minLength: 6, maxLength: 20 })}
            placeholder="Username"
            className={`${styles.input} ${errors.username ? styles['input-error'] : ''}`}
          />
          {errors.username && <p className={styles['error-message']}>Username must be 6-20 characters long</p>}
        </div>

        <div className={styles['input-group']}>
          <p>Email</p>
          <input
            {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
            placeholder="Email"
            className={`${styles.input} ${errors.email ? styles['input-error'] : ''}`}
          />
          {errors.email && <p className={styles.error}>Enter a valid email address</p>}
        </div>

        <div className={styles['input-group']}>
          <p>Password</p>
          <input
            {...register('password', { required: true, minLength: 6, maxLength: 40 })}
            placeholder="Password"
            type="password"
            className={`${styles.input} ${errors.password ? styles['input-error'] : ''}`}
          />
          {errors.password && <p className={styles.error}>Password must be 6-40 characters long</p>}
        </div>

        <div className={styles['input-group']}>
          <p>Repeat password</p>
          <input
            {...register('repeatPassword', {
              validate: (value) => value === watch('password') || 'The passwords do not match',
            })}
            placeholder="Repeat Password"
            type="password"
            className={`${styles.input} ${errors.repeatPassword ? styles['input-error'] : ''}`}
          />
          {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword.message}</p>}
        </div>

        <div className={styles['checkbox-group']}>
          <label htmlFor="agreement" className={styles['checkbox-label']}>
            <input
              type="checkbox"
              {...register('agreement', { required: 'You must agree to proceed' })}
              id="agreement"
              className={styles.checkbox}
            />
            I agree to the processing of my personal information
          </label>
          {errors.agreement && <p className={styles.error}>{errors.agreement.message}</p>}
        </div>
        <button type="submit" className={styles['submit-button']} disabled={!agreement}>
          Create
        </button>
        <p className={styles.signIn}>
          Already have an account?
          <Link to="/signin" className={styles['signIn-link']}>Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
