import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react';
import Home from '../Home/Home';
import Contact from '../Contact/Contact';
import { withRouter } from 'react-router-dom';
import images from './images';
import Offers from '../Offers/Offers';
import OfferPage from '../OfferPage/OfferPage';

const OffersRoute = ({user}) => (
  <Switch>
     <Route
        exact path='/offers'
        render={props => <Offers user={user}/>}
      />
      <Route
        path='/offers/:id'
        render={props => <OfferPage user={user}/>}
      />

  </Switch>
);

class MainRouter extends Component{
  constructor(props){
    super(props);
    this.state = { user : props.user };
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

const RouterContainer = withRouter(MainRouter);
export default RouterContainer;