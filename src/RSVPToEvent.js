import React from 'react';

export default class RSVPToEvent extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="First Name"/>
        <input type="text" placeholder="Last Name"/>
        <input type="number" placeholder="How Many Guests would you like to bring?"/>
        <button>RSVP</button>
      </div>
    );
  }
}
