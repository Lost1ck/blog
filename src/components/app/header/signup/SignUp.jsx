import React from 'react';
import { Link } from 'react-router-dom';
import styles from './signup.module.scss';

const SignUp = () => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleChangeChecked = (e) => {
    setIsChecked(e.target.checked);
  };

  // const [formatData, setFormatData] = React.useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   repeatPassword: '',
  //   isAgreementChecked: false,
  // });

  // const [errors, setErrors] = React.useState({});

  return (
    <div className={styles['form-container']}>
      <form className={styles.form}>
        <h2 className={styles.title}>Create new account</h2>
        <div className={styles['input-group']}>
          <p>Username</p>
          <input type="text" id="username" placeholder="Username" className={styles.input} />
        </div>
        <div className={styles['input-group']}>
          <p>Email address</p>
          <input type="email" id="email" placeholder="Email address" className={styles.input} />
        </div>
        <div className={styles['input-group']}>
          <p>Password</p>
          <input type="password" id="password" placeholder="Password" className={styles.input} />
        </div>
        <div className={styles['input-group']}>
          <p>Repeat Password</p>
          <input type="password" id="repeatPassword" placeholder="Password" className={styles.input} />
        </div>
        <div className={styles['checkbox-group']}>
          <label htmlFor="agreement" className={styles['checkbox-label']}>
            <input type="checkbox" id="agreement" className={styles.checkbox} checked={isChecked} onChange={handleChangeChecked} />
            I agree to the processing of my personal information
          </label>
        </div>
        <button type="submit" className={styles['submit-button']} disabled={!isChecked}>Create</button>
        <p className={styles.signIn}>
          Already have an account?
          {' '}
          <Link to="/signin" className={styles['signIn-link']}>Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
