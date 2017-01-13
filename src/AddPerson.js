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
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name"/>
          <input type="text" placeholder="About this person"/>
          <input type="number" min="0" placeholder="Plus One?"/>
          <button>Cancel</button>
          <button>Submit</button>
        </div>
      )
    return (
      <div>
        {componentRender}
      </div>
    );
  }
}
