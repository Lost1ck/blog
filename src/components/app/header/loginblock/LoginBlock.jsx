/* eslint-disable arrow-body-style */
import React from 'react';
import styles from './loginblock.module.scss';
// import Login from './Login';

export default function LoginBlock() {
  return (
    <div className={styles.container}>
      <SignUp />
      <SignIn />
    </div>
  );
}

const SignIn = () => {
  return (
    <div className={styles.signin}>
      SignIn
    </div>
  );
};

const SignUp = () => {
  return (
    <div className={styles.signup}>SignUp</div>
  );
};
