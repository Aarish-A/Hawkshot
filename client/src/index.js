import React from 'react';
import ReactDOM from 'react-dom';

import './custom.scss';

import App from './App';
import Firebase, {FirebaseContext} from './components/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App/>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
