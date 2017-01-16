import React from 'react';
import { BrowserRouter, Match, Miss, Link } from 'react-router';

export default class Homepage extends React.Component {

  render() {
    return (
      <div>
        <button><Link to="/create-event">Create a new event!</Link></button>
      </div>
    );
  }
}
