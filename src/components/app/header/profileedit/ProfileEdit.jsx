/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './profileedit.module.scss';
import { useUpdateUserData } from '../../../context/UserUpdate';

const ProfileEdit = () => {
  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm();
  const { fetchNewUserInfo } = useUpdateUserData();

  const local = JSON.parse(localStorage.getItem('accessToken'));

  const onSubmit = async (data) => {
    const {
      username, newPassword, email, image,
    } = data;
    const newData = {};

    if (local.user.username !== username) newData.username = username;
    if (local.user.password !== newPassword) newData.password = newPassword;
    if (local.user.email !== email) newData.email = email;
    if (local.user.image !== image) newData.image = image;
    if (Object.keys(newData).length > 0) {
      console.log(newData, 'after');
      const updateResult = await fetchNewUserInfo(newData);
      if (updateResult && !updateResult.errors) {
        const updatedData = { ...local.user, ...newData };
        localStorage.setItem('accessToken', JSON.stringify({ user: updatedData }));
        reset();
      }
    }
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
            required: true,
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
          {...register('image', {
            required: true,
            value: local.user.image,
          })}
          placeholder="Avatar image"
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileEdit;
