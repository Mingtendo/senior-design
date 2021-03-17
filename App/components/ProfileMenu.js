import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Courses from './Courses';
import Profile from './Profile';
import {Auth} from './AuthContext'

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../firebase';

const ProfileStack = createStackNavigator();

export default function Stack() {
    return (
      <ProfileStack.Navigator initialRouteName='Profile'>
        <ProfileStack.Screen name='Profile' component={Profile} />
        <ProfileStack.Screen name='Courses' component={Courses} />
      </ProfileStack.Navigator>
    );
}