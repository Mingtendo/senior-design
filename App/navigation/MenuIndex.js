import React from 'react';
import Menu from './Menu';
import {ProfileContext} from '../contexts/ProfileContext';

export default function App() {
  return(
    <ProfileContext>
        <Menu/>
    </ProfileContext>
  );
}