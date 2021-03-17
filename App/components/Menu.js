import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProfileMenu from './ProfileMenu';
import ChatMenu from './ChatMenu';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


export default function Menu(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileMenu} />
      <Tab.Screen name="Chat" component={ChatMenu} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});