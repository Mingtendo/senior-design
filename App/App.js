
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chat from './components/Chat';
import Login from './components/UpdatedLogin';
import Menu from './components/Menu';
import Register from './components/UpdatedRegister';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';


const Stack = createStackNavigator();


function MyStack() {
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
        name="Menu"
        component={Menu}
        options={{headerLeft: null, headerShown: false}}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
  );
}