import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import '../Style/Homepage.css';

export default class Homepage extends React.Component {

  render() {
    return (
      <div>
        <h1 className="home-title">Put Me On The List</h1>
        <h3 className="home-sub-header">The easiest way to invite and track your party's guests</h3>
        <Link className="link" to="/create-event"><Button className="begin-event-button" bsSize="large" bsStyle="primary">Let's Get Started</Button></Link>
      </div>
    );
  }
}
