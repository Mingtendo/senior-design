
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
        name="Chat"
        component={Chat}
        options={{ title: 'Chat', headerLeft: null }}
      />
    </Stack.Navigator>
  )
}

// function loginScreen() {
//   var isLoggedIn = firebase.auth().currentUser;
//   if (isLoggedIn) {
//     return (
//       <Login></Login>
//     )
//   }
// }

export default function App() {
  return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
  );
}