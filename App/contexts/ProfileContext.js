import React, { createContext, useState } from 'react';

export const Profile = createContext({});

export const ProfileContext = ({ children }) => {
  const [courses, setCourses] = useState(null);
  const [bio, setBio] = useState('');

  return (
    <Profile.Provider
      value={{
        courses,
        setCourses,
        bio,
        setBio
      }}
    >
      {children}
    </Profile.Provider>
  );
};