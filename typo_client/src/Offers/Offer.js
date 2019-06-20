import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { fetchOfferById, fetchInsertComment, setOfferData } from '../actions/offers';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Pagination from "react-js-pagination";
import DB from '../db/db';
import { FaSort } from "react-icons/fa";

function DetailedCard({title, text, footer, imageUrl}) {
  return (
  <div className='card__container'>
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Img variant="top" className="card__full-img" src={`${process.env.PUBLIC_URL}/${imageUrl}`} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{footer}</Card.Footer>
    </Card>
  </div>);
}

function Comment({username, date, content}){
  return (
  <Toast className="comment">
    <Toast.Header closeButton={false}>
      <strong className="mr-auto">{username}</strong>
      <small>{date.toString()}</small>
    </Toast.Header>
    <Toast.Body>{content}</Toast.Body>
  </Toast>);
}

function CommentSection({comments, per_page, page, ascendingOrder}){
  
  const modifier = ascendingOrder ? -1 : 1;
  comments = comments.sort((a,b) => {
    return modifier * b.data.addedAt.toDate() - modifier * a.data.addedAt.toDate();
  });
  const resultToRender = comments
    .slice((page-1) * per_page, page * per_page)
    .map(comment => 
    <Comment 
      username={comment.data.username} 
      content={comment.data.content}
      date={comment.data.addedAt.toDate()} 
      key={comment.id}
    />);
  return resultToRender;


}



class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingOffer : props.isFetchingOffer,
      offerData : props.offerData,
      error : props.error,
      currentOfferId : props.match.params.id,
      loggedInUser : props.loggedInUser,
      commentText : "",
      activePage : 1,
      ascendingOrder : false
    };
    this.getOfferData = props.getOfferData;
    this.insertComment = props.insertComment;
    this.setOfferData = props.setOfferData;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.subcribeToOfferChange = this.subcribeToOfferChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.unsubscribe = null;
  
   
    this.PER_PAGE = 5;
    this.PAGE_RANGE = 5;
  }

  handleChange(event) {
    this.setState({ commentText: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.insertComment(
      this.state.loggedInUser.name,
      this.state.commentText,
      this.state.currentOfferId
    );
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.offerData && nextProps.offerData !== prevState.offerData){
      console.log(nextProps.offerData);
      return { 
        offerData : nextProps.offerData,
        isFetchingOffer : nextProps.isFetchingOffer,
        error : nextProps.error,
        loggedInUser :  nextProps.loggedInUser,
        isFetchingInsert : nextProps.isFetchingInsert
      };
    } else if(nextProps.isFetchingOffer !== prevState.isFetchingOffer ){
      console.log("Updating isFetching offer");
      return { 
        isFetchingOffer: nextProps.isFetchingOffer,
        error : nextProps.error,
        loggedInUser :  nextProps.loggedInUser,
        isFetchingInsert : nextProps.isFetchingInsert
      };
    }else if(nextProps.loggedInUser !== prevState.loggedInUser){
      return { 
        loggedInUser :  nextProps.loggedInUser,
        isFetchingInsert : nextProps.isFetchingInsert
      };
    }else if(nextProps.isFetchingInsert !== prevState.isFetchingInsert){
      return { 
        isFetchingInsert : nextProps.isFetchingInsert
      };
    }else return null;
  }

  componentDidUpdate(prevProps) {
    // if data changed from null to something
    // or if id changed --> resubscribe 
    const isOfferDataAppeardOrChanged = (!prevProps.offerData && this.state.offerData) 
    || ( prevProps.offerData && prevProps.offerData.id !== this.state.offerData.id);

    if (isOfferDataAppeardOrChanged) {
      if(this.unsubscribe) this.unsubscribe();
      this.unsubscribe = this.subcribeToOfferChange();
    }
  }

  subcribeToOfferChange() {
    return DB.subcribeToOfferChange((comments) => {
      console.log(" new comments: ", comments);
      const newOfferData = { ...this.state.offerData };
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
      const cashedOffer = this.state.offerData;
      //check if offer already in state
      if(!cashedOffer || cashedOffer.id !== this.state.currentOfferId) this.getOfferData(this.state.currentOfferId);
      else {
        if(this.unsubscribe) this.unsubscribe();
        this.unsubscribe = this.subcribeToOfferChange();
      }
    }
  }

  render() {


    if(this.state.isFetchingOffer || (!this.state.offerData && !this.state.error)) return <h1 className="offers">Loading...</h1>;
    else if(this.state.error) return <h1 className="offers">Error occured: {this.state.error.toString()}</h1>
    else return (
      <React.Fragment>
        <DetailedCard
        title={this.state.offerData.name} text={this.state.offerData.description}
        footer={`Price per unit: ${this.state.offerData.price} UAH`}
        imageUrl={this.state.offerData.image_url}
        />
        <div className="comment__section">
          <Form hidden={!this.state.loggedInUser} onSubmit={this.handleSubmit} >
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="comment-form__caption">Comments</Form.Label>
              <Form.Control onChange={this.handleChange} disabled={this.state.isFetchingInsert} value={this.state.commentText} className="comment__textarea" placeholder="Leave a comment..." as="textarea" rows="3" />
              <div className="clearfix">
                <Button disabled={this.state.isFetchingInsert} className="comment__submit" variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form.Group>
          </Form>
          <hr/>
          <div className="clearfix">
            <div className="comment__sort">
              <button onClick={this.handleSortClick} className="comment__sort-link"><FaSort/></button>
              Sorted by date: {this.state.ascendingOrder ? "ascending" : "descending"} order
            </div>
          </div>
          <CommentSection 
          comments={this.state.offerData.comments} 
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
            totalItemsCount={this.state.offerData.comments.length}
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
)(Offer));