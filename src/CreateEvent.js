import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import '../Style/CreateEvent.css';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

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

  getValidationState() {
    const length = this.state.fieldValue.length;
    if (length < 1) return 'warning';
    else return 'success';
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
        <div className="create-event-page">
          <h1 className="event-create-header">Create Your Event</h1>
          <h4 className="create-event-subheader">Don't worry, you can change any of these fields later</h4>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>What is the name of your event?</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Event Name"
              onChange={this.handleChange}
              inputRef={(input) => this.name = input}
            />
            <FormControl.Feedback />
            <HelpBlock>This field is required.</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>When is your event?</ControlLabel>
            <FormControl
              type="date"
              value={this.state.value}
              placeholder="Date of Event"
              onChange={this.handleChange}
              inputRef={(input) => this.date = input}
            />
            <FormControl.Feedback />
            <HelpBlock>This field is required.</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Where is your event being held?</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Location of Event"
              onChange={this.handleChange}
              inputRef={(input) => this.location = input}
            />
            <FormControl.Feedback />
            <HelpBlock>This field is required.</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>What is the max capacity of the venue?</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Maximum number of attendees"
              onChange={this.handleChange}
              inputRef={(input) => this.capacity = input}
            />
            <FormControl.Feedback />
            <HelpBlock>This field is optional.</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>How many guests will you allow each invitee to bring?</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Max number of +1s"
              onChange={this.handleChange}
              inputRef={(input) => this.maxGuests = input}
            />
            <FormControl.Feedback />
            <HelpBlock>This field is optional.</HelpBlock>
          </FormGroup>
          <Button className="event-submit-button" bsSize="large" bsStyle="primary"
            onClick={() => this.postRequest(this.name.value, this.date.value, this.location.value, this.capacity.value, this.maxGuests.value)}
            >Submit
          </Button>
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
