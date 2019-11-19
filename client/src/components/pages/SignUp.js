import React, { useState, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom'

//higher order component, don't ask me what this does
import  {withFirebase} from '../firebase';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpPage = () => (
  <div>
    <h1>register u ho</h1>
      <SignUpForm />
  </div>
);

const SignUpFormBase = props => {
  const [state, setState] = useState(INITIAL_STATE);

  const onSubmit = event => {

    props.firebase
      .createUserWithEmailAndPassword(state.email, state.passwordOne)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: state.username
        })
        setState({ ...INITIAL_STATE});
        props.history.push('/');
      })
      .catch(error => {
        setState({...state, error: error});
      });

    event.preventDefault();
  };

  const onChange = event => {
    setState({...state, [event.target.name]: event.target.value});
  };

  const isInvalid =
    state.passwordOne !== state.passwordTwo ||
    state.passwordOne === '' ||
    state.email === '' ||
    state.username === '';

  return(
    <form onSubmit={onSubmit}>
    <input
        name="username"
        value={state.username}
        onChange={onChange}
        type="text"
        placeholder="Username"
      />
      <input
        name="email"
        value={state.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={state.passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={state.passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">Sign Up</button>

      {state.error && <p>{state.error.message}</p>}
    </form>
  );
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export {SignUpForm}
