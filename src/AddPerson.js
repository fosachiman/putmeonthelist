import React from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup, FormControl, HelpBlock} from 'react-bootstrap';

export default class AddPerson extends React.Component {


  render() {
    let componentRender;
    let {isAddingPerson} = this.props;
    if (!isAddingPerson)
      componentRender = (
        <div className="button-container">
          <Button className="add-a-person-button" bsSize="large" bsStyle="primary" onClick={() => this.props.addAPerson()}>+</Button>
          <p className="add-button-label">Add Guest</p>
        </div>
        )
    else
      componentRender = (
        <div className="add-person-form">
          <h3 className="add-person-header">Add a new person</h3>
          <FormGroup
            controlId="formBasicText"
          >
            <FormControl
              type="text"
              placeholder="First Name"
              inputRef={(input) => this.firstName = input}
            />
            <FormControl.Feedback />
            <HelpBlock>*Required</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
          >
            <FormControl
              type="text"
              placeholder="Last Name"
              inputRef={(input) => this.lastName = input}
            />
            <FormControl.Feedback />
            <HelpBlock>*Required</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
          >
            <FormControl
              type="text"
              placeholder="About this person"
              inputRef={(input) => this.about = input}
            />
            <FormControl.Feedback />
            <HelpBlock>*Adds a note next to this person (Optional)</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
          >
            <FormControl
              type="number"
              placeholder="Additional Guests"
              inputRef={(input) => this.guests = input}
            />
            <FormControl.Feedback />
            <HelpBlock>Will this person be bringing additional guests? (Optional)</HelpBlock>
          </FormGroup>

          <Button bsStyle="danger" onClick={() => this.props.cancelAddPerson()}>Cancel</Button>
          <Button bsStyle="success" onClick={() =>
              this.props.submitNewPerson
              (this.firstName.value, this.lastName.value, this.about.value, this.guests.value)}
              >Submit</Button>
        </div>
      )
    return (
      <div className="add-person-container">
        {componentRender}
      </div>
    );
  }
}
