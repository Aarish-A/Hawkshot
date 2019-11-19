import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
//import {compose} from 'recompose';
import {withFirebase} from '../firebase';
import hintService from '../../services/hints'

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

const SignInFormBase = props => {
  const [state, setState] = useState(INITIAL_STATE);

  console.log(state);

  const onSubmit = event => {
    event.preventDefault();
    console.log("BRUH",state);
    props.firebase
    .doSignInWithEmailAndPassword(state.email, state.password)
    .then(() => {
      setState({ ...INITIAL_STATE});
      hintService.updateToken(props.firebase);
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
}


const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
