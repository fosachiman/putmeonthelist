import React, { Component } from 'react';
import '../Style/App.css';
import Header from './Header';
import AddPerson from './AddPerson';
import PersonList from './PersonList';
import axios from 'axios';
var _reactBootstrap = require('react-bootstrap');


class App extends Component {
  constructor() {
    super();
    this.state = {
      isAddingPerson: false,
      people: {},
      confirms: 0,
      arrivals: 0,
      eventDetails: {},
      isSendingInvite: false,
    }
    this.addAPerson = this.addAPerson.bind(this);
    this.submitNewPerson = this.submitNewPerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.getRequest = this.getRequest.bind(this);
    this.editPerson = this.editPerson.bind(this);
    this.putRequest = this.putRequest.bind(this);
    this.calculateArrivals = this.calculateArrivals.bind(this);
    this.changeArrivals = this.changeArrivals.bind(this);
    this.cancelAddPerson = this.cancelAddPerson.bind(this);
    this.shareLink = this.shareLink.bind(this);
    this.gotLink = this.gotLink.bind(this);
  }
  //This component is the ADMIN page, the main hub where CRUD shines and the admin can make any
  //updates to the party guests that they'd like

  //on load, the page requests the event data and the person data associated with that event from Firebase

  componentDidMount() {
    this.getRequestEvent();
    this.getRequest();
  }

  //requests the event data

  getRequestEvent() {
    axios.get(`https://putmeonthelist-a86b4.firebaseio.com/${this.props.url}/.json`)
      .then((response) => {
        this.setState({ eventDetails: response.data });
      })
      .catch((response) => {
        console.log(response);
      })
  }

  //requests the person data

  getRequest() {
    axios.get(`https://putmeonthelist-a86b4.firebaseio.com/${this.props.url}/people/.json`)
      .then((response) => {
        this.setState({ people: response.data });
        this.calculateConfirms();
        this.calculateArrivals();
      })
      .catch((response) =>{
        console.log(response)
      })
  }

  //adds a person to the correct event

  postRequest(person) {
    axios.post(`https://putmeonthelist-a86b4.firebaseio.com/${this.props.url}/people/.json`, person)
      .then((response) => {
        let people = {...this.state.people};
        let personId = response.data.name;
        people[personId] = person;
        this.setState({ people })
        this.calculateConfirms();
      })
      .catch((response) => {
        console.log(response)
      })
  }

  //revises a person when the admin goes in and clicks the edit button

  putRequest(person) {
    axios.put(`https://putmeonthelist-a86b4.firebaseio.com/${this.props.url}/people/${person}.json`, this.state.people[person])
      .then((response) => {
        this.calculateConfirms();
      })
      .catch((response) => {
        console.log(response);
      })
  }

  //the sharelink button in the header is toggled on and off via state, to show the
  //form element where an ADMIN can get the link to send everyone

  shareLink() {
    this.setState({ isSendingInvite: true })
  }

  gotLink() {
    this.setState({ isSendingInvite: false })
  }

  //this method calculates the number of confirmations for the event.

  calculateConfirms() {
    let people = {...this.state.people};
    let numOfRSVPs = Object.keys(people).length;
    let plusOnes = Object.keys(people)
      .map((person) => {
        return people[person].guests;
      });
    if (plusOnes.length > 0) {
      let totalPlusOnes = plusOnes.reduce((guests, personGuests) => {
        return parseInt(guests) + parseInt(personGuests);
      })
      let totalConfirms = parseInt(numOfRSVPs) + parseInt(totalPlusOnes);
      this.setState({ confirms: totalConfirms });
    }
  }

  //this method calculates the number of arrivals for the event.

  calculateArrivals() {
    let people = {...this.state.people};
    let arrivalsMap = Object.keys(people)
      .map((person) => {
        if (people[person].numberOfArrivals === undefined || people[person].numberOfArrivals === NaN)
          return 0;
        return people[person].numberOfArrivals;
      })
    let arrivals = arrivalsMap.reduce((arrivals, personArrivals) => {
      return parseInt(arrivals) + parseInt(personArrivals);
    })
    this.setState({ arrivals });
  }

  //adding a person is saved in state to be toggled on and off when adding a person from the admin page

  addAPerson () {
    this.setState({ isAddingPerson: true })
  }

  cancelAddPerson () {
    this.setState({ isAddingPerson: false })
  }

  //submit a new person sends them to an FB post request and re-sets the people state

  submitNewPerson (firstName, lastName, about, guests) {
    if (guests === '' || NaN)
      guests = 0;
    let person = {
      firstName: firstName,
      lastName: lastName,
      about: about,
      guests: guests,
      numberOfArrivals: 0,
    }
    this.postRequest(person);
    this.setState({isAddingPerson: false})
  }

  //deletes a person from the admin page using the delete button

  deletePerson(person) {
    axios.delete(`https://putmeonthelist-a86b4.firebaseio.com/${this.props.url}/people/${person}.json`)
      .then((response) => {
        let people = {...this.state.people};
        delete people[person];
        this.setState({ people });
        this.calculateConfirms();
      })
      .catch((response) => {
        console.log(response);
      })
  }

  //edits the people state by changing the new attributes that have been submitted
  //at the OnChange inputs from the editPerson component

  editPerson(person, attribute, event) {
    let people = {...this.state.people};
    let attr = event.target.value
    people[person][attribute] = attr;
    this.setState({ people })
  }

  //changes the number of arrivals upon button press of the plus minus buttons in the person component

  changeArrivals(person, arrivals) {
    let people = {...this.state.people}
    people[person].numberOfArrivals = arrivals;
    this.setState({ people });
    this.putRequest(person);
    this.calculateArrivals();
  }

  render() {
    return (
      <div className="admin-page">
        <Header
          confirms={this.state.confirms}
          arrivals={this.state.arrivals}
          eventDetails={this.state.eventDetails}
          isSendingInvite={this.state.isSendingInvite}
          shareLink={this.shareLink}
          url={this.props.url}
          gotLink={this.gotLink}
        />
        <AddPerson
          isAddingPerson={this.state.isAddingPerson}
          addAPerson={this.addAPerson}
          submitNewPerson={this.submitNewPerson}
          cancelAddPerson={this.cancelAddPerson}
        />
        <PersonList
          people={this.state.people}
          deletePerson={this.deletePerson}
          editPerson={this.editPerson}
          putRequest={this.putRequest}
          calculateArrivals={this.calculateArrivals}
          changeArrivals={this.changeArrivals}
        />
      </div>
    );
  }
}

export default App;
