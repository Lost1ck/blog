/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import { userLogin } from '../../context/LoginContext';
import { useGlobal } from '../../context/GlobalContext';

export default function Header() {
  const { loggedIn, setLoggedIn } = useGlobal();
  const { storedData, updateStoredData } = userLogin();

  useEffect(() => {
    const storedUserData = localStorage.getItem('accessToken');
    if (storedUserData) {
      updateStoredData(JSON.parse(storedUserData));
    }
    if (!loggedIn) {
      localStorage.clear();
    }
  }, [loggedIn]);

  return (
    <header className={styles.container}>
      <Link to="/">
        <div className={styles.title}>
          <h2>Realworld Blog</h2>
        </div>
      </Link>
      <div className={styles['container-flex']}>
        {loggedIn && storedData?.user ? (
          <>
            <Link to="account/createpost" className={styles.signup}>Create article</Link>
            <div className={styles.profileContainer}>
              <Link to="account/profileedit" className={styles.username}>
                {storedData?.user?.username}
                <img src={storedData?.user?.image} alt="John Doe" className={styles.picture} />
              </Link>
            </div>
            <Link
              to="/"
              className={styles['log-out']}
              onClick={() => setLoggedIn(false)}
            >
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="signin">
              <p className={styles.signin}>Sign In</p>
            </Link>
            <Link to="signup">
              <p className={styles.signup}>Sign Up</p>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
