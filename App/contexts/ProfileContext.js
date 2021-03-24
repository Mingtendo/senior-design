import React, { createContext, useState } from 'react';

export const Profile = createContext({});

export const ProfileContext = ({ children }) => {
  const [courses, setCourses] = useState(null);

  return (
    <Profile.Provider
      value={{
        courses,
        setCourses
      }}
    >
      {children}
    </Profile.Provider>
  );
};