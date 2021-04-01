import React from 'react';
import Index from './navigation/index';
import {AuthContext} from './contexts/AuthContext';

export default function App() {
  return(
    <AuthContext>
        <Index/>
    </AuthContext>
  );
}