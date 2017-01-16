import React from 'react';
import axios from 'axios';
import RSVPToEvent from './RSVPToEvent';

export default class EventLandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      urlMatch: [],
      isRSVPing: false,
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
        <div>
          <button onClick={() => this.openRSVP()}>RSVP to this event</button>
          <button>Is this your event?</button>
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
