import React from 'react';
import axios from 'axios';

export default class RSVPToEvent extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  submitNewPerson(firstName, lastName, guests) {
    if (guests === '' || NaN)
      guests = 0;
    let person = {
      firstName: firstName,
      lastName: lastName,
      guests: guests,
    }
    this.postRequest(person);
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
    return (
      <div>
        <input type="text" placeholder="First Name" ref={(input) => this.firstName = input }/>
        <input type="text" placeholder="Last Name" ref={(input) => this.lastName = input }/>
        <input type="number" placeholder="Plus ones?" ref={(input) => this.guests = input }/>
        <button onClick={() => this.submitNewPerson(this.firstName.value, this.lastName.value, this.guests.value)}>RSVP</button>
      </div>
    );
  }
}
