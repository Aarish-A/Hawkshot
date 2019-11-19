import React from 'react';
import {withFirebase} from './components/firebase';
import {
  BrowserRouter as Router,
  Route, 
  Link, 
  Redirect, 
  withRouter
} from 'react-router-dom'

import {
  Image,
  Navbar,
} from 'react-bootstrap'
import Home from './components/pages/Home';
import SignInPage from './components/pages/SignIn';
import SignUpPage from './components/pages/SignUp';
import LoggedIn from './components/LoggedIn';
import LoggedOff from './components/LoggedOff';

import cards from './assets/data_dragon/en_us/data/set1-en_us'

const App = props => {
  const getCards = (cardType) => {
    const championCards = cards.filter(card => card.type === cardType);
    const divs = championCards.map(card => {
      return <div key = {card.cardCode} style = {{display: 'inline-grid'}}>
        <Image
          src = {require(`./assets/data_dragon/en_us/img/cards/${card.cardCode}.png`)} 
          alt = "Cannot load"
          fluid
        />
        <p>
          {card.name}
        </p>
      </div>
    })

    return divs;
  }
  return (
    <div className="App">
      <Router>
        <div> 
          <div>
            <Navbar bg = 'light'>
              <Navbar.Brand as = {Link} to = '/' style = {{fontSize: '50px'}}>Hawkshot</Navbar.Brand>
              <Navbar.Collapse className="justify-content-end">
<<<<<<< HEAD
                {props.firebase.currentUser?<LoggedIn/>:<LoggedOff/>}
=======
                <Navbar.Text> 
                  Signed in as: User 
                </Navbar.Text>
>>>>>>> 3ed9c5e2fceb98fcee43e7e42a28426077b72fad
              </Navbar.Collapse>
            </Navbar>
          </div>
          <div>
            <Route exact path = '/' render = {() => <Home/>} />
            <Route exact path = '/login' render = {() => <SignInPage/>} />
          </div>
        </div>
      </Router>
    </div>
  );
}

<<<<<<< HEAD
export default withFirebase(App);
=======
export default App;
>>>>>>> 3ed9c5e2fceb98fcee43e7e42a28426077b72fad
