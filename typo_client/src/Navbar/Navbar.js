import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import 'react-sticky-header/styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import DB from '../db/db';
import { connect } from 'react-redux';
import Sticky from './Sticky';
import NavbarContainer from './NavbarContainer';


const sides = {
  top: 0, // Sticks when it scrolls past the top edge
};

class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn : !!props.user,
      loggedInUser : props.user
    }
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: DB.getAuthProviders(),
      callbacks: {
        signInSuccessWithAuthResult: () => false
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.loggedInUser !== prevState.loggedInUser){
      return { 
        loggedInUser : nextProps.loggedInUser,
        isSignedIn : !!nextProps.loggedInUser
      };
    }  else return null;
  }

  render() {

    return (
    <div className="header">
      <PhotoSlider/>
      <Sticky sides={sides}>
        <NavbarContainer>
          <Navbar className="custom-navbar" bg="light" expand="lg">
            <Navbar.Brand className="custom-navbar__brand">KPI Typography</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <Link to='/' className="nav-link">Home</Link>
              <Link to='/offers' className="nav-link">Offers</Link>
              <Link to='/contact' className="nav-link">Contacts</Link>
              </Nav>
              <Nav>
                {this.state.isSignedIn ? (
                <React.Fragment>
                  <Navbar.Text>
                    Signed in as:
                  </Navbar.Text>  
                  <NavDropdown title={this.state.loggedInUser.name} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => DB.signOut()}>Sign out</NavDropdown.Item>
                    {/* <img alt="profile pic" src={firebase.auth().currentUser.photoURL}/> */}
                  </NavDropdown>
                </React.Fragment>) : (
                <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={DB.getAuthInstance()}
                    className="nav-link auth-link"
                  />
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar> 
        </NavbarContainer>
      </Sticky>
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
          <img className="slider__img" src={process.env.PUBLIC_URL + "/typo.jpg"} alt="Printing"></img>
        </div>
        <div className="slider__element">
          <img className="slider__img" src={process.env.PUBLIC_URL + "/books.jpg"} alt="Books"></img>
        </div>
        <div className="slider__element">
          <img className="slider__img" src={process.env.PUBLIC_URL + "/pencils.jpg"} alt="Pencils"></img>
        </div>
      </Slider>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser : state.auth.loggedInUser
  };
};

export default connect(
  mapStateToProps
)(CustomNavbar);