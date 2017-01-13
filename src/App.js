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
    }
    this.addAPerson = this.addAPerson.bind(this);
    this.submitNewPerson = this.submitNewPerson.bind(this);
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest() {
    axios.get("https://putmeonthelist-a86b4.firebaseio.com/key/people/.json")
      .then((response) => {
        this.setState({ people: response.data });
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
      })
      .catch((response) => {
        console.log(response)
      })
  }

  addAPerson () {
    this.setState({ isAddingPerson: true })
  }

  submitNewPerson (firstName, lastName, about = '', guests) {
    if (guests === '' || NaN)
      guests = 0;
    let person = {
      firstName: firstName,
      lastName: lastName,
      about: about,
      guests: guests,
    }
    console.log(person);
    this.postRequest(person);
    this.setState({isAddingPerson: false})
  }

  render() {
    return (
      <div className="admin-page">
        <Header />
        <AddPerson
          isAddingPerson={this.state.isAddingPerson}
          addAPerson={this.addAPerson}
          submitNewPerson={this.submitNewPerson}/>
        <PersonList people={this.state.people}/>
      </div>
    );
  }
}

export default App;
