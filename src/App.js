import React, { Component } from 'react';
import '../Style/App.css';
import Header from './Header';
import AddPerson from './AddPerson';
import PersonList from './PersonList';
import axios from 'axios';

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

  componentDidMount() {
    this.getRequestEvent();
    this.getRequest();
  }

  getRequestEvent() {
    axios.get(`https://putmeonthelist-a86b4.firebaseio.com/${this.props.params.id}/.json`)
      .then((response) => {
        this.setState({ eventDetails: response.data });
      })
      .catch((response) => {
        console.log(response);
      })
  }

  getRequest() {
    axios.get(`https://putmeonthelist-a86b4.firebaseio.com/${this.props.params.id}/people/.json`)
      .then((response) => {
        this.setState({ people: response.data });
        this.calculateConfirms();
        this.calculateArrivals();
      })
      .catch((response) =>{
        console.log(response)
      })
  }

  postRequest(person) {
    axios.post(`https://putmeonthelist-a86b4.firebaseio.com/${this.props.params.id}/people/.json`, person)
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

  putRequest(person) {
    axios.put(`https://putmeonthelist-a86b4.firebaseio.com/${this.props.params.id}/people/${person}.json`, this.state.people[person])
      .then((response) => {
        this.calculateConfirms();
      })
      .catch((response) => {
        console.log(response);
      })
  }

  shareLink() {
    this.setState({ isSendingInvite: true })
  }

  gotLink() {
    this.setState({ isSendingInvite: false })
  }

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

  addAPerson () {
    this.setState({ isAddingPerson: true })
  }

  cancelAddPerson () {
    this.setState({ isAddingPerson: false })
  }

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

  deletePerson(person) {
    axios.delete(`https://putmeonthelist-a86b4.firebaseio.com/${this.props.params.id}/people/${person}.json`)
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

  editPerson(person, attribute, event) {
    let people = {...this.state.people};
    let attr = event.target.value
    people[person][attribute] = attr;
    this.setState({ people })
  }

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
          url={this.props.params.id}
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
