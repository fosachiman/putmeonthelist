import React from 'react';
import { Button } from 'react-bootstrap';

export default class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <h1 className="event-name">{this.props.eventDetails.eventName}</h1>
        <p className="date">Date | Location</p>
        <Button className="get-share-link" bsStyle="info">Send Invite</Button>
        <div className="flex-container">
          <div className="stats">{this.props.confirms}<div className="on-the-list">On The List</div></div>
          <div className="stats">{this.props.arrivals}<div className="arrived">Arrived</div></div>
          <div className="stats">{this.props.eventDetails.maxCapacity}<div className="capacity">Capacity</div></div>
        </div>
      </div>
    );
  }
}
