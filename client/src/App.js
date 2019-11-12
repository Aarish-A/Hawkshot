import React from 'react';
import logo from './logo.svg';
import './App.css';
import cards from './data_dragon/en_us/data/set1-en_us'

function App() {

  const championCardGridStyle = {
    display: 'grid',
    justify_content: 'space-evenly',
    grid_template_columns: '50px 50px 50px', /*Make the grid smaller than the container*/
    grid_gap: '10px',
    background_color: '#2196F3',
    padding: '10px',
    background: '#000000'
  }

  const getChamps = () => {
    const championCards = cards.filter(card => card.supertype === 'Champion');
    const divs = championCards.map(card => {
      return <div key = {card.cardCode} style = {{display: 'inline-grid'}}>
        <img
          src = {require(`./data_dragon/en_us/img/cards/${card.cardCode}.png`)} 
          alt = "Cannot load"
          height = {200}
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className = "ChampionCardGrid" style = {championCardGridStyle}>
          {getChamps()}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
