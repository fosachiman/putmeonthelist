import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import App from './App';

export default class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      pageId: '',
      isAuth: false,
    }
  }

  postRequest(name, date, location, capacity, maxGuests) {
    let eventDetails = {
      eventName: name,
      date: date,
      location: location,
      maxCapacity: capacity,
      maxPlusOnes: maxGuests,
    }
    axios.post("https://putmeonthelist-a86b4.firebaseio.com/.json", eventDetails)
      .then((response) => {
        console.log(response);
        let pageId = response.data.name;
        this.setState({ pageId });
        this.setState({ isAuth: true })
        this.eventLandingPage();
      })
      .catch((response) => {
        console.log(response);
      })
  }

  eventLandingPage() {
    if (this.state.isAuth === true)
      return (
        <div>
          <Redirect to={`/event/admin/${this.state.pageId}`} />
        </div>
      )
    else
      return (
        <div>
          <input type="text" placeholder="Event Name" ref={(input) => this.name = input}/>
          <input type="date" ref={(input) => this.date = input}/>
          <input type="text" placeholder="Location" ref={(input) => this.location = input}/>
          <input type="text" placeholder="Capacity (optional)" ref={(input) => this.capacity = input}/>
          <input type="number" placeholder="Max number of guests (optional)" ref={(input) => this.maxGuests = input}/>
          <button onClick={() => this.postRequest(this.name.value, this.date.value, this.location.value, this.capacity.value, this.maxGuests.value)}>Submit</button>
        </div>
      )
  }

  render() {
    return (
      <div>
        {this.eventLandingPage()}
      </div>
    );
  }
}
