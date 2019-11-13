/* Node Dependencies */
import React from 'react';
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

/* React-Bootstrap Dependencies */
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

/* Style Dependencies */
import './App.css';

/* Riot API and DataDragon Dependencies */
import cards from './data_dragon/en_us/data/set1-en_us'

const TestComponent = ({text}) => {
  return <p>{text}</p>
}


const App = () => {
  const getCards = (cardType) => {
    const championCards = cards.filter(card => card.type === cardType);
    const divs = championCards.map(card => {
      return <div key = {card.cardCode} style = {{display: 'inline-grid'}}>
        <Image
          src = {require(`./data_dragon/en_us/img/cards/${card.cardCode}.png`)} 
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
            <Navbar>
              <Navbar.Brand as = {Link} to = '/'>Hawkshot</Navbar.Brand>
              <Nav>
                <Nav.Link as = {Link} to = '/cards'>Cards</Nav.Link>
                <Nav.Link as = {Link} to = '/hints'>Hints</Nav.Link>
              </Nav>
            </Navbar>
          </div>
          <Route exact path = '/' render = {() => <TestComponent text = 'Hawkshot'/>} />
          <Route exact path = '/cards' render = {() => <TestComponent text = 'Cards'/>} />
          <Route exact path = '/hints' render = {() => <TestComponent text = 'Hints'/>} />
        </div>
      </Router>
    </div>
  );
}

export default App;




{/* <header>
        <Container>
          <Row>
            <Col sm = {true}>
              <h1>Cards</h1>
            </Col>
            <Col sm = {true}>
              <Image src = {logo} alt = "could not find" height = "100"/>
            </Col>
            <Col sm = {true}>
              <h1>Hints</h1>
            </Col>
          </Row>
        </Container>
      </header>
      <div>
        <Row>
          <Col sm = {true}>
            <input type = "search" placeholder = "Search for a card" style = {{width: "100%"}}/>
          </Col>
          <Col sm = {1}>
            <button type = "button">
              Submit a Hint!
            </button>
          </Col>
        </Row>
        <Row>
          <Col sm = {true}>
            {getCards('Unit')}
          </Col>
          <Col sm = {true}>
            {getCards('Spell')}
          </Col>
          <Col sm = {true}>
            {getCards('Unit')}
          </Col>
          <Col sm = {true}>
            {getCards('Spell')}
          </Col>
          <Col sm = {true}>
            {getCards('Unit')}
          </Col>
          <Col sm = {true}>
            {getCards('Spell')}
          </Col>
        </Row>
      </div> */}