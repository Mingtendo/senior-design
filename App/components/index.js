
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from './Login';
import Menu from './Menu';
import Register from './Register';

import {Auth} from './AuthContext'

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../firebase';


const Stack = createStackNavigator();


function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: 'Register', headerLeft: null}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Login', headerLeft: null }}
      />
    </Stack.Navigator>
  )
}

export default function App() {
    const { user, setUser } = useContext(Auth);
    const [initializing, setInitializing] = useState(true);
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  


  return (
      <NavigationContainer>
        {user ? <Menu/> : <LoginStack /> }
      </NavigationContainer>
  );
}