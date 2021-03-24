import React, { useContext, useState, useEffect } from 'react';
import Login from '../components/Login';
import MenuIndex from './MenuIndex';
import Register from '../components/Register';
import Forgot from '../components/ForgotPass';
import {Auth} from '../contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
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
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{ title: 'Forgot Password'}}
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
        {user ? <MenuIndex/> : <LoginStack /> }
      </NavigationContainer>
  );
}