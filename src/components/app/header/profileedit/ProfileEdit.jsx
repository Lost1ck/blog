/* eslint-disable jsx-a11y/label-has-associated-control */
// EditProfile.js
import React, { useContext } from 'react';
import styles from './profileedit.module.scss';
import UserContext from '../../../context/Context';

const ProfileEdit = () => {
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={styles.editProfileForm}>
      <h2>Edit Profile</h2>
      <label>
        Username
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          placeholder="New password"
          value={user.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Avatar image (url)
        <input
          type="text"
          name="avatarUrl"
          placeholder="Avatar image"
          value={user.avatarUrl}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
    </div>
  );
};

export default ProfileEdit;
