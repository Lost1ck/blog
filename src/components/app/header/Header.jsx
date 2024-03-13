import React from 'react';
import styles from './header.module.scss';
import Title from './title/Title';
import LoginBlock from './loginblock/LoginBlock';

export default function Header() {
  return (
    <section className={styles.container}>
      <Title />
      <LoginBlock />
    </section>
  );
}
