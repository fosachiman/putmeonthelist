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
        />)
      })
    return (
      <div>
        {personComponent}
      </div>
    );
  }
}
