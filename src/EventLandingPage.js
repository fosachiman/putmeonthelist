import React from 'react';

export default class EventLandingPage extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button>RSVP to this event</button>
        <button>Is this your event?</button>
      </div>
    );
  }
}
