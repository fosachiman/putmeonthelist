import React from 'react';

export default class EditPerson extends React.Component {

  render() {
    let {people} = this.props;
    let {person} = this.props;
    return (
      <div>
        <input type="text" value={people[person].firstName} onChange={(e) => this.props.editPerson(person, 'firstName', e)} />
        <input type="text" value={people[person].lastName} onChange={(e) => this.props.editPerson(person, 'lastName', e)} />
        <input type="text" value={people[person].about} onChange={(e) => this.props.editPerson(person, 'about', e)} />
        <input type="text" value={people[person].guests} onChange={(e) => this.props.editPerson(person, 'guests', e)} />
        <button onClick={() => this.props.submitEdits(person)}>Submit</button>
      </div>
    );
  }
}
