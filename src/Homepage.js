import React from 'react';
import { BrowserRouter, Match, Miss, Link } from 'react-router';

export default class Homepage extends React.Component {

  render() {
    return (
      <div>
        <h3>What would you like to name your event?</h3>
        <input type="text" placeholder="Event Name"/>
        <div><Link to="/create-event">Create a new event!</Link></div>
      </div>
    );
  }
}
