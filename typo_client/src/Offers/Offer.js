import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect , withRouter} from 'react-router-dom';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import { fetchOfferById } from '../actions/offers';


function DetailedCard() {
  return (
  <Card className="text-center">
    <Card.Header>Featured</Card.Header>
    <Card.Body>
      <Card.Title>Special title treatment</Card.Title>
      <Card.Text>
        With supporting text below as a natural lead-in to additional content.
      </Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">2 days ago</Card.Footer>
  </Card>);
}



class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingOffer: props.isFetchingOffer,
      offerData : props.offerData,
      error : props.error,
      currentOfferId: props.match.params.id,
    };
    this.getOfferData = props.getOfferData;
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.offerData && nextProps.offerData !== prevState.offerData){
      console.log(nextProps.offerData);
      return { 
        offerData : nextProps.offerData,
        isFetchingOffer : nextProps.isFetchingOffer,
        error : nextProps.error 
      };
    } else if(nextProps.isFetchingOffer !== prevState.isFetchingOffer ){
      console.log("Updating isFetching offer");
      return { 
        isFetchingOffer: nextProps.isFetchingOffer,
        error : nextProps.error
      };
    } else return null;
  }

  componentDidMount(){
    if(this.getOfferData && !this.state.offerData) this.getOfferData(this.state.currentOfferId);
  }

  render() {
    if(this.state.isFetchingOffer) return <h1>Loading...</h1>;
    else if(this.state.error) return <h1>Error occured: {this.state.error.toString()}</h1>
    else return <div>Offer {this.state.currentOfferId}</div>
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    getOfferData: (id) => {
        dispatch(fetchOfferById(id));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    isFetchingOffer : state.offers.isFetchingOffer,
    offerData : state.offers.offerData,
    error : state.offers.error
  }
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Offer));