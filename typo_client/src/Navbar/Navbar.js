import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import DB from '../db/db';
import { connect } from 'react-redux';
import Sticky from './Sticky';
import NavbarContainer from './NavbarContainer';
import PhotoSlider from './PhotoSlider';

const sides = {
  top: 0, // Sticks when it scrolls past the top edge
};

class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: DB.getAuthProviders(),
      callbacks: {
        signInSuccessWithAuthResult: () => false
      }
    }
  }
  render() {

    const isSignedIn = !!this.props.loggedInUser;
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
                {isSignedIn ? (
                <React.Fragment>
                  <Navbar.Text>
                    Signed in as:
                  </Navbar.Text>  
                  <NavDropdown title={this.props.loggedInUser.name} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => DB.signOut()}>Sign out</NavDropdown.Item>
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

const mapStateToProps = (state) => {
  return {
    loggedInUser : state.auth.loggedInUser
  };
};

export default connect(
  mapStateToProps
)(CustomNavbar);