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
    }
    this.addAPerson = this.addAPerson.bind(this);
    this.submitNewPerson = this.submitNewPerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.getRequest = this.getRequest.bind(this);
    this.editPerson = this.editPerson.bind(this);
    this.putRequest = this.putRequest.bind(this);
  }

  componentDidMount() {
    this.getRequest();

    this.calculateArrivals();
  }

  getRequest() {
    axios.get("https://putmeonthelist-a86b4.firebaseio.com/key/people/.json")
      .then((response) => {
        this.setState({ people: response.data });
        this.calculateConfirms();
      })
      .catch((response) =>{
        console.log(response)
      })
  }

  postRequest(person) {
    axios.post("https://putmeonthelist-a86b4.firebaseio.com/key/people/.json", person)
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
    axios.put(`https://putmeonthelist-a86b4.firebaseio.com/key/people/${person}.json`, this.state.people[person])
      .then((response) => {
        console.log(response);
        this.calculateConfirms();
      })
      .catch((response) => {
        console.log(response);
      })
  }

  calculateConfirms() {
    let people = {...this.state.people}
    let numOfRSVPs = Object.keys(people).length
    let plusOnes = Object.keys(people)
      .map((person) => {
        return people[person].guests;
      })
    if (plusOnes.length > 0) {
      let totalPlusOnes = plusOnes.reduce((guests, personGuests) => {
        return parseInt(guests) + parseInt(personGuests);
      })
      let totalConfirms = parseInt(numOfRSVPs) + parseInt(totalPlusOnes)
      this.setState({ confirms: totalConfirms })
    }
  }

  calculateArrivals() {

  }

  addAPerson () {
    this.setState({ isAddingPerson: true })
  }

  submitNewPerson (firstName, lastName, about, guests) {
    if (guests === '' || NaN)
      guests = 0;
    let person = {
      firstName: firstName,
      lastName: lastName,
      about: about,
      guests: guests,
    }
    this.postRequest(person);
    this.setState({isAddingPerson: false})
  }

  deletePerson(person) {
    axios.delete(`https://putmeonthelist-a86b4.firebaseio.com/key/people/${person}.json`)
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

  render() {
    return (
      <div className="admin-page">
        <Header
          confirms={this.state.confirms}
          arrivals={this.state.arrivals}
        />
        <AddPerson
          isAddingPerson={this.state.isAddingPerson}
          addAPerson={this.addAPerson}
          submitNewPerson={this.submitNewPerson}
        />
        <PersonList
          people={this.state.people}
          deletePerson={this.deletePerson}
          editPerson={this.editPerson}
          putRequest={this.putRequest}
        />

      </div>
    );
  }
}

export default App;
