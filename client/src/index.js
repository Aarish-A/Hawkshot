import React from 'react';
import ReactDOM from 'react-dom';

import ThemeProvider from '@material-ui/styles/ThemeProvider'

import App from './App';
import Firebase, { FirebaseContext } from './components/firebase';

import MuiTheme from './MuiTheme.js'

ReactDOM.render(
   <ThemeProvider theme = {MuiTheme}>
     <FirebaseContext.Provider value={new Firebase()}>
         <App/>
     </FirebaseContext.Provider>
   </ThemeProvider>,

   document.getElementById('root')
);
