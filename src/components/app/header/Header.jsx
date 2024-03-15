/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

export default function Header() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const logining = () => {
    setLoggedIn(true);
  };

  const loginout = () => {
    setLoggedIn(false);
  };

  return (
    <header className={styles.container}>
      <Link to="account/" onClick={loginout}>
        <div className={styles.title}>
          <h2>Realworld Blog</h2>
        </div>
      </Link>
      <div className={styles['container-flex']}>
        {loggedIn ? (
          <>
            <Link to="signin">
              <p className={styles.signin}>Sign In</p>
            </Link>
            <Link to="signup">
              <p className={styles.signup}>Sign Up</p>
            </Link>
          </>
        ) : (
          <>
            <Link to="account/createpost" className={styles.signup}>Create article</Link>
            <div className={styles.profileContainer}>
              <Link to="account/profileedit" className={styles.username}>John Doe</Link>
              <img src="path_to_image.jpg" alt="John Doe" className={styles.picture} />
            </div>
            <Link
              to="/"
              className={styles['log-out']}
              onClick={logining}
            >
              Log Out
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
