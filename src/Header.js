import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <img src="#" alt="" />
        <h1>Event Name</h1>
        <p>Number of people on the list: {this.props.confirms}</p>
        <p>Number of people who have shown up: {this.props.arrivals}</p>
        <p>Capacity of event</p>
      </div>
    );
  }
}
