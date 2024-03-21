/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './profileedit.module.scss';

const ProfileEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const local = JSON.parse(localStorage.getItem('accessToken'));
  const onSubmit = async (data) => {
    const {
      username, newPassword, email, avatar,
    } = data;
    let newData = {};
    if (username !== local.user.username) {
      newData = { ...newData, username };
    }
    if (newPassword !== local.user.password) {
      newData = { ...newData, password: newPassword };
    }
    if (email !== local.user.email) {
      newData = { ...newData, email };
    }
    if (avatar !== local.user.avatar) {
      newData = { ...newData, avatar };
    }
    localStorage.setItem('accessToken', JSON.stringify(newData));
    console.log(newData);
    reset();
  };

  return (
    <form className={styles.editProfileForm} onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Profile</h2>
      <label htmlFor="username">
        Username
        <input
          type="text"
          id="username"
          {...register('username', {
            required: true,
            value: local.user.username,
            minLength: 6,
            maxLength: 20,
          })}
          placeholder="Username"
        />
        {errors.username && (
          <span>
            {errors.username.message}
            Username must be 6-20 characters long
          </span>
        )}
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Write your new email',
            value: local.user.email,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Write your correct email',
            },
          })}
          placeholder="Email"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </label>
      <label htmlFor="password">
        New password
        <input
          id="password"
          type="password"
          {...register('password', {
            minLength: {
              value: 6,
              message: 'Please enter your new password',
            },
            maxLength: {
              value: 40,
              message: 'Please enter your new password',
            },
          })}
          placeholder="New password"
        />
      </label>
      <label htmlFor="image">
        Avatar image (url)
        <input
          id="image"
          type="text"
          {...register('avatarUrl', {
            pattern: {
              value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
            },
          })}
          placeholder="Avatar image"
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileEdit;
