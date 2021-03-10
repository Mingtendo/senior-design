import React from 'react';
import Index from './components/index';
import {AuthContext} from './components/AuthContext';


export default function App() {
  return(
    <AuthContext>
         <Index/>
    </AuthContext>
  );
}