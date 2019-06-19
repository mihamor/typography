import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOffers } from '../actions/offers';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';

function CustomCard({title, text, footer, imageUrl}){

return (
  <Card className="card">
    <Card.Img variant="top" className="card__img" src={imageUrl} />
    <Card.Body>
      <Card.Title className="card__heading">{title}</Card.Title>
      <Card.Text>
        {text}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted card__footer">{footer}</small>
    </Card.Footer>
  </Card>);

}


function CustomCardDeck({cards}){
  return (
    <div className="offers">
      <CardDeck className="offers__deck">
        { cards.map( doc => {
            return <CustomCard title={doc.data.name} text={doc.data.description}
            footer={`Price per unit: ${doc.data.price} UAH`}
            imageUrl={doc.data.image_url}
            key={doc.id}/>
        })}
      </CardDeck>
    </div>);
}




class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingOffers: props.isFetchingOffers,
      offersData : props.offersData,
      error : props.error
    };
    this.getOffersData = props.getOffersData;
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.offersData && nextProps.offersData !== prevState.offersData){
      console.log(nextProps.offersData);
      return { 
        offersData : nextProps.offersData,
        isFetchingOffers : nextProps.isFetchingOffers,
        error : nextProps.error 
      };
    } else if(nextProps.isFetchingOffers !== prevState.isFetchingOffers ){
      console.log("Updating isFetching offers");
      return { 
        isFetchingOffers: nextProps.isFetchingOffers,
        error : nextProps.error
      };
    } else return null;
  }

  componentDidMount(){
    if(this.getOffersData && !this.state.offersData) this.getOffersData();
  }

  render() {
    if(this.state.isFetchingOffers) return <h1>Loading...</h1>;
    else if(this.state.error) return <h1>Error occured: {this.state.error.toString()}</h1>
    else return <CustomCardDeck cards={this.state.offersData}/>;
  }
} 


const mapDispatchToProps = (dispatch) => {
  return {
    getOffersData: () => {
        dispatch(fetchOffers());
    }
  }
};

const mapStateToProps = (state) => {
  return {
    isFetchingOffers : state.offers.isFetchingOffers,
    offersData : state.offers.offersData,
    error : state.offers.error
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offers);
