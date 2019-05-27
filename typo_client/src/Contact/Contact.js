import React, { Component } from 'react';
import Map from './Map';


class Contact extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.state = {
      isLoggedIn: this.user ? true : false,
    };
  }

  render() {

    return (
    <div className="contact">
      <Map/>
    </div>);
  }
} 

//AIzaSyB2AWqsBw6NLLz6j36GNkaUt2HYBH3Citw



export default Contact;
