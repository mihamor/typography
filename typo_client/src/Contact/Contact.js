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
      <div className="map-wrapper"><Map/></div>
      <div className="map__caption">
        <h1 className="caption__heading">Contact us</h1>
        <div><b>Address:</b> PZKS department, FPM, pr. Peremogy, 37, Kyiv, Ukraine, 03056</div>
        <div><b>Tel:</b><i>+38066646177</i></div>
      </div>
    </div>);
  }
} 

export default Contact;