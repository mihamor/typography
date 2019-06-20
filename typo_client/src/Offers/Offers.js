import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOffers } from '../actions/offers';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { MdSearch } from "react-icons/md";
import { search_throgh, compare_to_offer } from './utils';

function CustomCard({title, text, footer, imageUrl, id}){

return (
  <Card className="card card_bounds">
    <Card.Img variant="top" className="card__img" src={imageUrl} />
    <Card.Body>
      <Card.Title className="card__heading">{title}</Card.Title>
      <Card.Text>
        {text}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Link to={`/offers/${id}`}><small className="text-muted card__footer">{footer}</small></Link>
    </Card.Footer>
  </Card>);

}


function CustomCardDeck({cards}){

  let resultToRender = null;
  if(cards.length === 0) resultToRender = <h1 className="offers__deck">Not found...</h1>;
  else resultToRender = <CardDeck className="offers__deck">
  { cards.map( doc => {
      return <CustomCard title={doc.data.name} text={doc.data.description}
      footer={`Price per unit: ${doc.data.price} UAH`}
      imageUrl={doc.data.image_url}
      id={doc.id}
      key={doc.id}/>
  })}
</CardDeck>;

  return resultToRender;
}

class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingOffers: props.isFetchingOffers,
      offersData : props.offersData,
      error : props.error,
      searchInput : ""
    };
    this.getOffersData = props.getOffersData;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({ searchInput: event.target.value });
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
    if(this.state.isFetchingOffers || (!this.state.error && !this.state.offersData)) return <h1 className="offers">Loading...</h1>;
    else if(this.state.error) return <h1 className="offers">Error occured: {this.state.error.toString()}</h1>
    else return (
    <div className="offers">
      <InputGroup className="offers__search">
        <InputGroup.Prepend>
        <InputGroup.Text bsPrefix="input-group-text search-input" id="basic-addon1"><MdSearch/></InputGroup.Text>
        
        </InputGroup.Prepend>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
          bsPrefix="form-control search-input"
          value={this.state.searchInput}
          onChange={this.handleChange}
        />
      </InputGroup>
      <CustomCardDeck cards={search_throgh(this.state.offersData, this.state.searchInput, compare_to_offer)}/>
    </div> );
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
