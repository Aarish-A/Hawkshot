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

const LoggedIn = props => {
  return(
  <>
    <Navbar.Text>
      Signed in as: {props.firebase.auth.currentUser.displayName}
    </Navbar.Text>
    <Button onClick={props.firebase.doSignOut}>Sign Out</Button>
  </>)
};

export default withFirebase(LoggedIn);
