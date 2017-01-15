import React from 'react';
import Person from './Person';

export default class PersonList extends React.Component {

  render() {
    let personComponent = Object.keys(this.props.people)
      .map((person) => {
        return (
        <Person
          key={person}
          person={person}
          people={this.props.people}
          deletePerson={this.props.deletePerson}
          editPerson={this.props.editPerson}
          putRequest={this.props.putRequest}
          calculateArrivals={this.props.calculateArrivals}
        />)
      })
    return (
      <div>
        {personComponent}
      </div>
    );
  }
}
