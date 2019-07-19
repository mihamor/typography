import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOffers } from '../actions/offers';
import CustomCardDeck from './CustomCardDeck';
import { search_throgh, compare_to_offer } from './utils';
import OfferFilter from './OfferFilter';

class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput : "",
      filterCheck : false,
      priceRange : 500,
    };

    this.MIN_RANGE = 0;
    this.MAX_RANGE = 1000;

    this.getOffersData = props.getOffersData;
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  handleSearchChange(event){
    this.setState({ searchInput: event.target.value });
  }

  handleRangeChange(value){
    this.setState({ priceRange: value });
  }
  handleCheckChange(event){
    this.setState({ filterCheck: event.target.checked });
  }

  componentDidMount(){
    if(this.getOffersData && !this.props.offersData) this.getOffersData();
  }

  render() {
    if(this.props.isFetchingOffers || (!this.props.error && !this.props.offersData)) return <h1 className="offers">Loading...</h1>;
    else if(this.props.error) return <h1 className="offers">Error occured: {this.props.error.toString()}</h1>
    else return (
    <div className="offers">
      <OfferFilter
        searchInput={this.state.searchInput}
        handleSearchChange={this.handleSearchChange}
        filterCheck={this.state.filterCheck}
        handleCheckChange={this.handleCheckChange}
        handleRangeChange={this.handleRangeChange}
        MAX_RANGE={this.MAX_RANGE}
        MIN_RANGE={this.MIN_RANGE}
        priceRange={this.state.priceRange}
      />
      <CustomCardDeck cards={
        search_throgh(this.props.offersData,
          this.state.searchInput, 
          this.state.filterCheck, 
          this.state.priceRange, 
          compare_to_offer)}/>
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
