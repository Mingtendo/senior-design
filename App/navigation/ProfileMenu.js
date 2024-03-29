import React from 'react';
import Courses from '../components/Courses';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import { createStackNavigator } from '@react-navigation/stack';

const ProfileStack = createStackNavigator();

export default function Stack() {
    return (
      <ProfileStack.Navigator initialRouteName='Profile'>
        <ProfileStack.Screen name='Profile' component={Profile} />
        <ProfileStack.Screen name='EditProfile' component={EditProfile}/>
        <ProfileStack.Screen name='Courses' component={Courses} />
      </ProfileStack.Navigator>
    );
}