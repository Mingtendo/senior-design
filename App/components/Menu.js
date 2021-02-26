import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProfileScreen from './Profile';
import ChatScreen from './Chat';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


export default function Menu(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});