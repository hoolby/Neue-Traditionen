import React from "react";

class ContactAsked extends React.Component {
  constructor(props) {
    super(props);

    this.state = { contactsAsked: [] };
  }

  componentDidMount() {
    fetch("http://localhost:5000/contact",{
     method: "GET"})
      .then(response => {
        response.json();
      })
      .then(contactsAsked => {
        this.setState({ contactsAsked });
      })
      .then(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
          {this.state.contactsAsked.map(contact => (
            <p>{contact}</p>
          ))}
      </div>
    );
  }
}

export default ContactAsked;