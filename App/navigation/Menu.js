import React, {useContext, useEffect} from 'react';
import ProfileMenu from './ProfileMenu';
import ChatMenu from '../components/ChatMenu';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Auth} from '../contexts/AuthContext';
import {Profile} from '../contexts/ProfileContext';
import firebase from '../firebase.js';

const Tab = createBottomTabNavigator();

export default function Menu() {
  const {courses, setCourses} = useContext(Profile);
  const { user } = useContext(Auth);
  const currentUser = user.toJSON();

  useEffect(() => {
    const courseListener = firebase.firestore()
      .collection('PROFILES')
      .doc(currentUser.uid)
      .onSnapshot(query => {
        const courseData = query.data();
        var courseList = [];
        if(courseData){
          if (courseData.hasOwnProperty('courseList')){
            courseList = courseData.courseList
          }
        }
        setCourses(courseList);
      });
    return () => courseListener();
  }, []);

  return (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={ProfileMenu} />
        <Tab.Screen name="Chat" component={ChatMenu} />
      </Tab.Navigator>
  );
}