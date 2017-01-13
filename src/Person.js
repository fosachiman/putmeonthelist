import React from 'react';

export default class Person extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    let {people} = this.props;
    let {person} = this.props;
    console.log(person);
    return (
      <div>
        <p>{`${people[person].firstName} ${people[person].lastName}`}</p>
        <p> - {people[person].about}</p>
        <p>{people[person].guests}</p>
        <button>Edit</button>
        <button onClick={() => this.props.deletePerson(person)}>Delete</button>
      </div>
    );
  }
}
