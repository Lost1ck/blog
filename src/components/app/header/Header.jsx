/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import Title from './title/Title';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.container}>
      <Link to="/"><Title /></Link>
      <div className={styles['container-flex']}>
        <Link to="/signup"><p className={styles.signup}>Sign Up</p></Link>
        <Link to="/signin"><p className={styles.signin}>Sign In</p></Link>
      </div>
    </header>
  );
}
