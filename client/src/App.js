import React, { useState, useEffect } from 'react';
import { withFirebase } from './components/firebase';

import {
   BrowserRouter as Router,
   Route,
} from 'react-router-dom'

import Home from './components/pages/Home'
import LoginPage from './components/pages/Login'
import SignupPage from './components/pages/Signup'
import NavigationBar from './components/NavigationBar.js'

import hintService from './services/hints'


const App = ({firebase}) => {
   const [userAuth, setUserAuth] = useState(null)

   useEffect(() => {
      firebase.auth.onAuthStateChanged(user => {
         user ? setUserAuth(user) : setUserAuth(null)
         hintService.updateToken(firebase)
      })    
   }, [])

   return (
      <>
         <Router>
            <NavigationBar userAuth = {userAuth}/>
            <Route exact path = '/' render = {() => <Home/>} />
            <Route exact path = '/login' render = {() => <LoginPage/>} />
            <Route exact path = '/signup' render = {() => <SignupPage/>} />
         </Router>
      </>
   )
}

export default withFirebase(App);
