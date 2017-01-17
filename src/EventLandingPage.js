import React from 'react';
import axios from 'axios';
import RSVPToEvent from './RSVPToEvent';
import '../Style/EventLandingPage.css';
import { Button } from 'react-bootstrap';

export default class EventLandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      urlMatch: [],
      isRSVPing: false,
      eventDetails: {},
    }
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest() {
    axios.get(`https://putmeonthelist-a86b4.firebaseio.com/.json`)
      .then((response) => {
        console.log(response);
        console.log(this.props.url);
        let eventDetails = response.data[this.props.url];
        this.setState({ eventDetails })
        let arrMatch = Object.keys(response.data)
          .filter((id) => {
            return id === this.props.url;
          })
        this.setState({ urlMatch: arrMatch })
      })
      .catch((response) => {
        console.log(response);
      })
  }

  openRSVP() {
    this.setState({ isRSVPing: true })
  }

  checkURLMatch() {
    if (this.state.urlMatch.length < 1)
      return (
        <div>
          <p>This event doesn't exist!</p>
        </div>
      )
    else
      return (
        <div className="event-landing-page">
          <h4 className="brand-header">Put Me On The List</h4>
          <h2>Hello there, you've been invited to:</h2>
          <h1>{this.state.eventDetails.eventName}</h1>
          <p>{`${this.state.eventDetails.date} | ${this.state.eventDetails.location}`}</p>
          <Button bsSize="large" onClick={() => this.openRSVP()}>RSVP to this event</Button>
        </div>
      )
  }

  render() {
    let form = null;
    if (this.state.isRSVPing)
      form = (
        <div>
          <RSVPToEvent url={this.props.url}/>
        </div>
      )
    return (
      <div>
        {this.checkURLMatch()}
        {form}
      </div>
    );
  }
}
