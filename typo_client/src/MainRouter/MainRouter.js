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
            <Route path='/offers' component={Offers}/>
            {/* <Route path='/profile' render={props => <Redirect to={path_to_user}/>}/>
            <Route path='/developer/v3' component={ApiInfo}/>
            {/*
            <Route path='/admin_menu' render={props => <AdminMenu user={this.state.user}/>}/>
            <Route 
            path ='/tracks'
            render={props => <TracksRoute user={this.state.user} socket={this.socket}/>}
            />
            <Route 
            path ='/users'
            render={props => <UsersRoute user={this.state.user}/>}
            />
            <Route 
            path ='/playlists'
            render={props => <PlaylistsRoute user={this.state.user}/>}
            />
            <Route 
            path='/auth' 
            render={props => <Auth match='/auth'/>}
            />
            <Route component={NoMatch} /> */} */}
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