import React from 'react';

export default class CreateEvent extends React.Component {

  render() {
    return (
      <div>
        <h3>Name of Event</h3>
        <input type="date" />
        <input type="text" placeholder="Location"/>
        <input type="text" placeholder="Capacity (optional)"/>
        <input type="number" placeholder="Max number of guests (optional)"/>
        <button>Submit</button>
      </div>
    );
  }
}


//On submit of this information, it should be POST'd as another object within the
//same event (next to people), and this object can be pulled from in the App
//the key that is generated from creating this new object should be the URL
//that is used for the event, and that event ONLY
//on click of the submit button, you can find the id number using the POST request,
//getting that request back, finding the data.name and then using that data.name
//as the url and passing that on through
