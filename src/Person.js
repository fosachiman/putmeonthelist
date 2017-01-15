import React from 'react';
import EditPerson from './EditPerson';

export default class Person extends React.Component {

  constructor() {
    super();
    this.state = {
      isEdit: false,
    }
    this.personRender = this.personRender.bind(this);
    this.changeEditStatus = this.changeEditStatus.bind(this);
    this.submitEdits = this.submitEdits.bind(this);
  }

  changeEditStatus() {
    this.setState({ isEdit: true })
  }

  submitEdits(person) {
    this.setState({ isEdit: false })
    this.props.putRequest(person);
  }

  handleNumberChange(event, person) {
    event.preventDefault();
    this.props.people[person].numberOfArrivals = event.target.value;
    this.props.putRequest(person);
    this.props.calculateArrivals();
  }

  personRender() {
    let {people} = this.props;
    let {person} = this.props;
    let renderPerson;
    if (!this.state.isEdit){
      renderPerson = (
        <div>
          <p>{`${people[person].firstName} ${people[person].lastName}`}</p>
          <p> - {people[person].about}</p>
          <p>{people[person].guests}</p>
          <input type="number" min="0" max={people[person].guests} value={people[person].numberOfArrivals} onChange={(e) => this.handleNumberChange(e, person)}/>
          <button onClick={() => this.changeEditStatus()}>Edit</button>
          <button onClick={() => this.props.deletePerson(person)}>Delete</button>
        </div>
      )
    }
    else {
      renderPerson = (
        <div>
          <EditPerson
            people={this.props.people}
            person={this.props.person}
            isEdit={this.state.isEdit}
            submitEdits={this.submitEdits}
            editPerson={this.props.editPerson}
          />
        </div>)
    }
    return renderPerson;
  }

  render() {
    return (
      <div>
        {this.personRender()}
      </div>
    );
  }
}
