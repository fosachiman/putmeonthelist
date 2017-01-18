import React from 'react';
import EditPerson from './EditPerson';
import { Button } from 'react-bootstrap';

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

  incrementArrivals(person) {
    if (this.props.people[person].numberOfArrivals < parseInt(this.props.people[person].guests) + 1) {
      let arrivals = this.props.people[person].numberOfArrivals;
      arrivals++;
      this.props.changeArrivals(person, arrivals)
    }
  }

  decrementArrivals(person) {
    if (this.props.people[person].numberOfArrivals > 0) {
      let arrivals = this.props.people[person].numberOfArrivals;
      arrivals--;
      this.props.changeArrivals(person, arrivals)
    }
  }

  guests(person) {
    if (this.props.people[person].guests < 1)
      return;
    else
      return `+${this.props.people[person].guests}`
  }

  personRender() {
    let {people} = this.props;
    let {person} = this.props;
    let renderPerson;
    if (!this.state.isEdit){
      renderPerson = (
        <div className="person">
          <div className="name-about">
            <p className="name">{`${people[person].firstName} ${people[person].lastName}`}</p>
            <p className="about">{people[person].about}</p>
          </div>
          <div className="guests">{this.guests(person)}</div>
          <div className="arrivals-container">
            <div className="arrivals">{people[person].numberOfArrivals}</div>
            <div className="person-button-container">
              <Button bsSize="large" className="plus-button" onClick={() => this.incrementArrivals(person)}>+</Button>
              <Button bsSize="large" className="minus-button" onClick={() => this.decrementArrivals(person)}>_</Button>
            </div>
              <Button onClick={() => this.changeEditStatus()}>Edit</Button>
              <Button onClick={() => this.props.deletePerson(person)}>Delete</Button>
          </div>
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
      <div className="person-container">
        {this.personRender()}
      </div>
    );
  }
}
