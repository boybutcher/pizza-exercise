import React, { Component } from 'react';
import ToppingsContainer from './ToppingsContainer.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Topping Tracker</h2>
        <ToppingsContainer />
      </div>
    );
  }
}

export default App;
