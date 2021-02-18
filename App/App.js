
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chat from './components/Chat';
import Login from './components/UpdatedLogin';
import Menu from './components/Menu';
import Register from './components/UpdatedRegister';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      >
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: 'Register'}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Login'}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ title: 'Chat'}}
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