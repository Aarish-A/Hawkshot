import React from 'react';
import {
  Image,
  Navbar,
  Button,
} from 'react-bootstrap';
import {
  Link,
} from 'react-router-dom'
import {withFirebase} from './firebase';

const LoggedIn = withFirebase(props => {
  return(
  <>
    <Navbar.Text>
      Signed in as: {props.firebase.auth.currentUser.displayName}
    </Navbar.Text>
    <Button onClick={props.firebase.signOut}>Sign Out</Button>
  </>)
})

export default LoggedIn;
