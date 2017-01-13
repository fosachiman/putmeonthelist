import React from 'react';

export default class AddPerson extends React.Component {


  render() {
    let componentRender;
    let {isAddingPerson} = this.props;
    console.log(isAddingPerson);
    if (!isAddingPerson)
      componentRender = (
          <button onClick={() => this.props.addAPerson()}>Add a Person</button>
        )
    else
      componentRender = (
        <div>
          <h3>Add a new person</h3>
          <input type="text" placeholder="First Name" ref={input => this.firstName = input}/>
          <input type="text" placeholder="Last Name" ref={input => this.lastName = input}/>
          <input type="text" placeholder="About this person" ref={input => this.about = input}/>
          <input type="number" min="0" placeholder="Plus One?" ref={input => this.guests = input}/>
          <button>Cancel</button>
          <button onClick={() =>
              this.props.submitNewPerson
              (this.firstName.value, this.lastName.value, this.about.value, this.guests.value)}
              >Submit</button>
        </div>
      )
    return (
      <div>
        {componentRender}
      </div>
    );
  }
}
