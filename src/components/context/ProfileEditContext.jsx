import React, { useContext, createContext } from 'react';

const profileContext = createContext();

export default function ProfileEditContext() {
  return (
    <div>ProfileEditContext</div>
  );
}

export const profileEdit = () => useContext(profileContext);
