import React from 'react';
import ReactDOM from 'react-dom';

import ThemeProvider from '@material-ui/styles/ThemeProvider'

import App from './App';
import Firebase, { FirebaseContext } from './components/firebase';

import CssBaseline from '@material-ui/core/CssBaseline'
import MuiTheme from './MuiTheme'

ReactDOM.render(
   <ThemeProvider theme = {MuiTheme}>
     <FirebaseContext.Provider value={new Firebase()}>
         <CssBaseline>
            <App/>
         </CssBaseline>
     </FirebaseContext.Provider>
   </ThemeProvider>,

   document.getElementById('root')
);
