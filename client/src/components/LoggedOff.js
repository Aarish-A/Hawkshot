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

const LoggedOff = props => {
  return(
  <>
    <Button as = {Link} to = '/login'>Sign in</Button>
  </>)
};

export default withFirebase(LoggedOff);
