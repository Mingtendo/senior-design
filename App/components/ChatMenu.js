import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Chat from './Chat';
import ChatList from './ChatList';
import { createStackNavigator } from '@react-navigation/stack';

const ChatStack = createStackNavigator();

export default function Stack() {
  return (
    <ChatStack.Navigator initialRouteName='ChatList'>
      <ChatStack.Screen name='ChatList' component={ChatList} />
      <ChatStack.Screen name='Chat' component={Chat} />
    </ChatStack.Navigator>
  );
}