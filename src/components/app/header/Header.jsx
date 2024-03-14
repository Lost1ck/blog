/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import Title from './title/Title';
import styles from './header.module.scss';

export default function Header() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const logining = () => {
    setLoggedIn(true);
  };

  return (
    <header className={styles.container}>
      <Link to="/">
        <Title />
      </Link>
      <div className={styles['container-flex']}>
        {loggedIn ? (
          <>
            <Link to="/signup">
              <p className={styles.signup}>Sign Up</p>
            </Link>
            <Link to="/signin">
              <p className={styles.signin}>Sign In</p>
            </Link>
          </>
        ) : (
          <>
            <Link to="/post" className={styles.signup}>Create article</Link>
            <div className={styles.profileContainer}>
              <Link to="/profileedit" className={styles.username}>John Doe</Link>
              <img src="path_to_image.jpg" alt="John Doe" className={styles.picture} />
            </div>
            <button
              type="submit"
              className={styles['log-out']}
              onSubmit={logining}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </header>
  );
}
