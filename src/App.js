import React, { Component } from 'react';
import '../Style/App.css';
import Header from './Header';
import AddPerson from './AddPerson';
import PersonList from './PersonList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAddingPerson: false,
      people: {},
    }
    this.addAPerson = this.addAPerson.bind(this);
  }

  addAPerson () {
    this.setState({ isAddingPerson: true })
  }

  render() {
    return (
      <div className="admin-page">
        <Header />
        <AddPerson
          isAddingPerson={this.state.isAddingPerson}
          addAPerson={this.addAPerson}/>
        <PersonList />
      </div>
    );
  }
}

export default App;
