import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';
import Home from '../Home/Home';
import Contact from '../Contact/Contact';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLocation } from '../actions/location';
import '../style.css';
import images from './images';
import Offers from '../Offers/Offers';
import Offer from '../Offers/Offer';


const OffersRoute = ({user}) => (
  <Switch>
     <Route
        exact path='/offers'
        render={props => <Offers user={user}/>}
      />
      <Route
        path='/offers/:id'
        render={props => <Offer user={user}/>}
      />

  </Switch>
);

class MainRouter extends Component{
  constructor(props){
    super(props);
    this.state = { location : "home" };
    this.onRouteChanged = props.changeCurrLocation;
  }
  render() {
    return (
        <main className="content">
          <Switch>
            <Route
            exact path="/"
            render={props => <Home user={this.state.user} images={images}/>}
            />
            <Route path='/contact' component={Contact}/>
            <Route 
            path='/offers'
            render={props => <OffersRoute user={this.state.user}/>}
            />
          </Switch>
        </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrLocation: (data) => {
        dispatch(changeLocation(data));
    }
  }
};

const RouterContainer = withRouter(connect(
  null,
  mapDispatchToProps
)(MainRouter));

export default RouterContainer;