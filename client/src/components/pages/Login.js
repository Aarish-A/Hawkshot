import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../firebase';
import hintService from '../../services/hints'

const LoginPage = () => (
  <div>
    <h1>Sign In</h1>
    <LoginForm />
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

const LoginForm = withRouter(withFirebase(props => {
  const [state, setState] = useState(INITIAL_STATE);

  const onSubmit = event => {
    event.preventDefault();
    console.log("BRUH",state);
    props.firebase
      .signInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        hintService.updateToken(props.firebase);
        setState({ ...INITIAL_STATE});
        props.history.push('/');
      })
      .catch(error => {
        setState({...state, error: error});
      });
  };

  const onChange = event => {
    setState({...state, [event.target.name]: event.target.value});
  };

  const isInvalid =
    state.email === '' ||
    state.password === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={state.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={state.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit"> Sign In </button>

      {state.error && <p>{state.error.message}</p>}
    </form>
  )
}))

export default LoginPage;
