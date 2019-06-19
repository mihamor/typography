import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import 'react-sticky-header/styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn : !!props.user 
    }
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (
    <div className="header">
      <PhotoSlider/>
        <Navbar className="custom-navbar" bg="light" expand="lg">
          <Navbar.Brand className="custom-navbar__brand">KPI Typography</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
             <Link to='/' className="nav-link">Home</Link>
             <Link to='/offers' className="nav-link">Offers</Link>
             <Link to='/contact' className="nav-link">Contacts</Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              {this.state.isSignedIn ? (
              <React.Fragment>
                <Navbar.Text>
                  Signed in as:
                </Navbar.Text>  
                <NavDropdown title={firebase.auth().currentUser.displayName} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => firebase.auth().signOut()}>Sign out</NavDropdown.Item>
                  {/* <img alt="profile pic" src={firebase.auth().currentUser.photoURL}/> */}
                </NavDropdown>
              </React.Fragment>
                
              ) : (
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                  className="nav-link auth-link"
                />
              )}
              {/* <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </div>
    );

  }
}

const PhotoSlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    adaptiveHeight: false,
    infinite: true,
    useCSS: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider">
      <Slider {...settings}>
        <div className="slider__element">
          <img className="slider__img" src={process.env.PUBLIC_URL + "typo.jpg"} alt="Printing"></img>
        </div>
        <div className="slider__element">
          <img className="slider__img" src={process.env.PUBLIC_URL + "books.jpg"} alt="Books"></img>
        </div>
        <div className="slider__element">
          <img className="slider__img" src={process.env.PUBLIC_URL + "pencils.jpg"} alt="Pencils"></img>
        </div>
      </Slider>
    </div>
  );
};


export default CustomNavbar;