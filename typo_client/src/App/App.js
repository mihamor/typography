import React, { Component } from 'react';
import MainRouter from '../MainRouter/MainRouter';
import Navbar from '../Navbar/Navbar';
import '../style.css';


class App extends Component {
  render() {
    return (
      <div className="app">
          <Navbar/>
          <MainRouter/>
      </div>
    );
  }
}

export default App;
