import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <h1 className="event-name">{this.props.eventDetails.eventName}</h1>
        <div className="flex-container">
          <div className="on-the-list">On The List<div className="stats">{this.props.confirms}</div></div>
          <div className="arrived">Arrived<div className="stats">{this.props.arrivals}</div></div>
          <div className="capacity">Capacity<div className="stats">{this.props.eventDetails.maxCapacity}</div></div>
        </div>
      </div>
    );
  }
}
