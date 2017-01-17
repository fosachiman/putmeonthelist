  import React from 'react';
import { Button, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

export default class Header extends React.Component {


  inviteSendState() {
    let inviteSendState;
    if (!this.props.isSendingInvite) {
      inviteSendState = (
      <div>
        <Button
          className="get-share-link"
          bsStyle="info"
          onClick={() => this.props.shareLink()}
        >Send Invite
        </Button>
      </div>
      )
    }
    else {
      inviteSendState = (
      <div className="rsvp-link">
        <p>Copy and paste this link:</p>
        <FormGroup
          controlId="formBasicText"
        >
          <FormControl
            type="text"
            value={`/event/${this.props.url}`}
            inputRef={(input) => this.firstName = input}
          />
          <FormControl.Feedback />
          <HelpBlock>Any of your invitees can RSVP from the link above</HelpBlock>
        </FormGroup>
        <Button bsStyle="info" onClick={() => this.props.gotLink()}>Ok, got it</Button>
      </div>
      )
    }
    return inviteSendState;
  }

  render() {
    return (
      <div className="header">
        <h1 className="event-name">{this.props.eventDetails.eventName}</h1>
        <p className="date">{`${this.props.eventDetails.date} | ${this.props.eventDetails.location}`}</p>
        {this.inviteSendState()}
        <div className="flex-container">
          <div className="stats">{this.props.confirms}<div className="on-the-list">On The List</div></div>
          <div className="stats">{this.props.arrivals}<div className="arrived">Arrived</div></div>
          <div className="stats">{this.props.eventDetails.maxCapacity}<div className="capacity">Capacity</div></div>
        </div>
      </div>
    );
  }
}
