import React from 'react';
import logo from './images/Hawkshot Logo.svg';
import './App.css';
import cards from './data_dragon/en_us/data/set1-en_us'
import {Container, Row, Col, Image} from 'react-bootstrap'

function App() {
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
      <header>
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
      </div>
    </div>
  );
}

export default App;
