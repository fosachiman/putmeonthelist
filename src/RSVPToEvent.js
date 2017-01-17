import React from 'react';
import axios from 'axios';
import { FormGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';


export default class RSVPToEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      rsvpd: false,
    }
  }

  submitNewPerson(firstName, lastName, guests) {
    if (guests === '' || NaN)
      guests = 0;
    let person = {
      firstName: firstName,
      lastName: lastName,
      guests: guests,
      about: '',
      numberOfArrivals: 0,
    }
    this.postRequest(person);
    this.setState({ rsvpd: true })
  }

  postRequest(person) {
    axios.post(`https://putmeonthelist-a86b4.firebaseio.com/${this.props.url}/people/.json`, person)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response)
      })
  }

  render() {
    if (this.state.rsvpd)
      return(
        <div className="rsvp-form">
          <h3 className="thanks">Thanks, you're on the list!</h3>
        </div>
      )
    else
    return (
      <div className="rsvp-form">
        <FormGroup
          controlId="formBasicText"
        >
          <FormControl
            type="text"
            placeholder="First Name"
            inputRef={(input) => this.firstName = input}
          />
          <FormControl.Feedback />
          <HelpBlock>*Required</HelpBlock>
        </FormGroup>
        <FormGroup
          controlId="formBasicText"
        >
          <FormControl
            type="text"
            placeholder="Last Name"
            inputRef={(input) => this.lastName = input}
          />
          <FormControl.Feedback />
          <HelpBlock>*Required</HelpBlock>
        </FormGroup>
        <FormGroup
          controlId="formBasicText"
        >
          <FormControl
            type="number"
            placeholder="Number of Additional Guests"
            inputRef={(input) => this.guests = input}
          />
          <FormControl.Feedback />
          <HelpBlock>Will you be bringing additional guests? (Optional)</HelpBlock>
        </FormGroup>
        <Button
          className="submit-button"
          bsSize="large"
          onClick={() => this.submitNewPerson(this.firstName.value, this.lastName.value, this.guests.value)}>Add Me To The List</Button>
      </div>
    );
  }
}
