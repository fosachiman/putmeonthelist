import React from 'react';
import Person from './Person';

export default class PersonList extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Person />
      </div>
    );
  }
}
