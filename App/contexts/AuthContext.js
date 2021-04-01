import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import firebase from '../firebase';

export const Auth = createContext({});

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <Auth.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch(e){
              throw e;
          }
        },
        register: async (email, password, passwordConfirm) => {
            if (email === '' && password === '') { Alert.alert('Enter details to register!') }
            if (password !== passwordConfirm) { Alert.alert('Passwords do not match!') }
            else{
                try {
                    const doRegister = await firebase.auth().createUserWithEmailAndPassword(email, password);
                    if(doRegister.user) {
                      firebase.auth().currentUser.sendEmailVerification();
                    } 
                } catch (e) {
                    throw e;
                }
            }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            throw(e);
          }
        }
      }}
    >
      {children}
    </Auth.Provider>
  );
};