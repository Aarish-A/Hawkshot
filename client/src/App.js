import React, { useState, useEffect } from 'react';
import { withFirebase } from './components/firebase';

import {
   BrowserRouter as Router,
   Route,
   Link,
} from 'react-router-dom'

import {
   Image,
   Navbar,
   ThemeProvider,
} from 'react-bootstrap'

import Home from './components/pages/Home';
import SignInPage from './components/pages/Login';
import SignUpPage from './components/pages/SignUp';
import LoggedIn from './components/LoggedIn';
import LoggedOff from './components/LoggedOff';

import hintService from './services/hints'


import NavigationBar from './components/NavigationBar.js'

const App = withFirebase(props => {
   const [userAuth, setUserAuth] = useState(null)

   useEffect(() => {
      props.firebase.auth.onAuthStateChanged(user => {
         user ? setUserAuth(user) : setUserAuth(null)
         hintService.updateToken(props.firebase)
      })    
   }, [])

   return (
      <>
         <Router>
           <NavigationBar userAuth = {userAuth}/>
           {/* <Route exact path = '/' render = {() => <Home/>} /> */}
            <Route exact path = '/login' render = {() => <SignInPage/>} />
         </Router>
      </>
   )


  // return (
  //   <div className="App">
  //     <Router>
  //       <div>
  //         <div>
  //           <Navbar bg = 'light'>
  //             <Navbar.Brand as = {Link} to = '/' style = {{fontSize: '50px'}}>Hawkshot</Navbar.Brand>
  //             <Navbar.Collapse className="justify-content-end">
  //               {authUser ? <LoggedIn/> : <LoggedOff/>}
  //             </Navbar.Collapse>
  //           </Navbar>
  //         </div>
  //         <div>
  //           <Route exact path = '/' render = {() => <Home/>} />
  //           <Route exact path = '/login' render = {() => <SignInPage/>} />
  //           <Route exact path = '/signup' render = {() => <SignUpPage/>} />
  //         </div>
  //       </div>
  //     </Router>
  //   </div>
  // );
})

export default App;
