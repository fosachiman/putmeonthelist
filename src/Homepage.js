import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import '../Style/Homepage.css';
import axios from 'axios';
var _reactBootstrap = require('react-bootstrap');


export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
    }
  }

  componentDidMount() {
  axios.get(`https://api.giphy.com/v1/gifs/search?q=party&api_key=dc6zaTOxFJmzC`)
    .then((response) => {
      let gifLink = response.data.data[Math.floor(Math.random()*25)].images.looping.mp4;
      this.setState({ url: gifLink });
    })
    .catch((response) => {
      console.log(response);
    })
  }

  render() {
    return (
      <div>
        <h1 className="home-title">Put Me On The List</h1>
        <h3 className="home-sub-header">The easiest way to invite and track your party's guests</h3>
        <Link className="link" to="/create-event"><Button className="begin-event-button" bsSize="large" >Let's Get Started</Button></Link>
        <video className="gif" autoPlay loop
           src={this.state.url} type="video/mp4">
        </video>
      </div>
    );
  }
}
