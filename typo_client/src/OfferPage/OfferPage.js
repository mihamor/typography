import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { fetchOfferById, fetchInsertComment, setOfferData } from '../actions/offers';
import Pagination from "react-js-pagination";
import DB from '../db/db';
import DetailedCard from './DetailedCard';
import CommentSection from './ComnnetSection';
import CommentForm from './CommentForm';

class OfferPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOfferId : props.match.params.id,
      commentText : "",
      activePage : 1,
      ascendingOrder : false,
      isValidComment : false
    };
    this.getOfferData = props.getOfferData;
    this.insertComment = props.insertComment;
    this.setOfferData = props.setOfferData;
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.subcribeToOfferChange = this.subcribeToOfferChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.unsubscribe = null;
    this.PER_PAGE = 5;
    this.PAGE_RANGE = 5;
  }

  processCommentString(str) {
    return str.trim().replace(/\s+/g, ' ');
  }

  handleCommentChange(event) {
    const commentText = event.target.value;
    const commentPayload = this.processCommentString(commentText);
    this.setState({ commentText, isValidComment : commentPayload.length !== 0 });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.isValidComment){
      const commentPayload = this.processCommentString(this.state.commentText);
      this.insertComment(
        this.props.loggedInUser.name,
        commentPayload,
        this.state.currentOfferId
      );
      this.setState({commentText : '', isValidComment: false});
    }
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

  componentDidUpdate(prevProps) {
    // if data changed from null to something
    // or if id changed --> resubscribe 
    const isOfferDataAppeardOrChanged = (!prevProps.offerData && this.props.offerData) 
    || ( prevProps.offerData && prevProps.offerData.id !== this.props.offerData.id);

    if (isOfferDataAppeardOrChanged) {
      if(this.unsubscribe) this.unsubscribe();
      this.unsubscribe = this.subcribeToOfferChange();
    }
  }

  subcribeToOfferChange() {
    return DB.subcribeToOfferChange((comments) => {
      const newOfferData = { ...this.props.offerData };
      newOfferData.comments =  comments;
      this.setOfferData(newOfferData);
      this.setState({commentText : ""});
    }, this.state.currentOfferId);
  }

  componentWillUnmount(){
    if(this.unsubscribe) this.unsubscribe();
  }

  handleSortClick(){
    ///change order of sort
    this.setState({ascendingOrder : !this.state.ascendingOrder});
  }
  componentDidMount(){
    if(this.getOfferData){
      const cashedOffer = this.props.offerData;
      //check if offer already in state
      if(!cashedOffer || cashedOffer.id !== this.state.currentOfferId)
        this.getOfferData(this.state.currentOfferId);
      else {
        if(this.unsubscribe) this.unsubscribe();
        this.unsubscribe = this.subcribeToOfferChange();
      }
    }
  }

  render() {
    if(this.props.isFetchingOffer || (!this.props.offerData && !this.props.error)) return <h1 className="offers">Loading...</h1>;
    else if(this.props.error) return <h1 className="offers">Error occured: {this.props.error.toString()}</h1>
    else return (
      <React.Fragment>
        <DetailedCard
          title={this.props.offerData.name} text={this.props.offerData.description}
          footer={`Price per unit: ${this.props.offerData.price} UAH`}
          imageUrl={this.props.offerData.image_url}
        />
        <div className="comment__section">
          <CommentForm
            handleCommentChange={this.handleCommentChange}
            handleSortClick={this.handleSortClick}
            handleSubmit={this.handleSubmit}
            state={this.state}
            isFetchingInsert={this.props.isFetchingInsert}
            loggedInUser={this.props.loggedInUser}
          />
          <CommentSection 
            comments={this.props.offerData.comments} 
            per_page={this.PER_PAGE}
            page={this.state.activePage}
            ascendingOrder={this.state.ascendingOrder}
          />
          <div className="custom-pagination__container ">
            <Pagination
              activePage={this.state.activePage}
              innerClass="pagination justify-content-center"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="page-item active"
              itemsCountPerPage={this.PER_PAGE}
              totalItemsCount={this.props.offerData.comments.length}
              pageRangeDisplayed={this.PAGE_RANGE}
              onChange={this.handlePageChange}
            /> 
          </div>
        </div>
      </React.Fragment>);
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    getOfferData: (id) => {
      dispatch(fetchOfferById(id));
    },
    setOfferData : (data) => {
      dispatch(setOfferData(data));
    },
    insertComment: (username, content, offerId) => {
      dispatch(fetchInsertComment(username, content, offerId));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    isFetchingOffer : state.offers.isFetchingOffer,
    offerData : state.offers.offerData,
    error : state.offers.errorInOffer,
    loggedInUser : state.auth.loggedInUser,
    isFetchingInsert : state.offers.isFetchingInsert
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferPage));