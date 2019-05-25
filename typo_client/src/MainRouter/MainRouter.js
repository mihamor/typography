import { Switch, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react';
import Home from '../Home/Home';
import '../style.css';
import images from './images';

class MainRouter extends Component{
  constructor(props){
    super(props);
    this.state = {user: props.user};
  }

  render() {
    return (
        <main className="content">
          <Switch>
            <Route
            exact path="/"
            render={props => <Home user={this.state.user} images={images}/>}
            />
            {/* <Route path='/about' component={About}/>
            <Route path='/profile' render={props => <Redirect to={path_to_user}/>}/>
            <Route path='/developer/v3' component={ApiInfo}/>
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
            <Route component={NoMatch} /> */}
          </Switch>
        </main>
    );
  }
}



export default MainRouter;