import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { fetchOfferById } from '../actions/offers';
import Toast from 'react-bootstrap/Toast'

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

class Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingOffer : props.isFetchingOffer,
      offerData : props.offerData,
      error : props.error,
      currentOfferId : props.match.params.id,
      loggedInUser : props.loggedInUser
    };
    this.getOfferData = props.getOfferData;
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.offerData && nextProps.offerData !== prevState.offerData){
      console.log(nextProps.offerData);
      return { 
        offerData : nextProps.offerData,
        isFetchingOffer : nextProps.isFetchingOffer,
        error : nextProps.error,
        loggedInUser :  nextProps.loggedInUser
      };
    } else if(nextProps.isFetchingOffer !== prevState.isFetchingOffer ){
      console.log("Updating isFetching offer");
      return { 
        isFetchingOffer: nextProps.isFetchingOffer,
        error : nextProps.error,
        loggedInUser :  nextProps.loggedInUser
      };
    }else if(nextProps.loggedInUser !== prevState.loggedInUser){
      return { 
        loggedInUser :  nextProps.loggedInUser
      };
    } else return null;
  }

  componentDidMount(){
    if(this.getOfferData){
      const cashedOffer = this.state.offerData;
      //check if offer already in state
      if(!cashedOffer || cashedOffer.id !== this.state.currentOfferId) this.getOfferData(this.state.currentOfferId);
    }
  }

  render() {
    if(this.state.isFetchingOffer || (!this.state.offerData && !this.state.error)) return <h1>Loading...</h1>;
    else if(this.state.error) return <h1>Error occured: {this.state.error.toString()}</h1>
    else return (
      <React.Fragment>
        <DetailedCard
        title={this.state.offerData.name} text={this.state.offerData.description}
        footer={`Price per unit: ${this.state.offerData.price} UAH`}
        imageUrl={this.state.offerData.image_url}
        />
        <div className="comment__section">
          <Form.Group hidden={!this.state.loggedInUser} controlId="exampleForm.ControlTextarea1">
            <Form.Label className="comment-form__caption">Comments</Form.Label>
            <Form.Control placeholder="Leave a comment..." as="textarea" rows="3" />
          </Form.Group>
          <hr/>
          {this.state.offerData.comments.map(comment => 
            <Comment 
            username={comment.data.username} 
            content={comment.data.content}
            date={comment.data.addedAt.toDate()} 
            key={comment.id}
            />)}
        </div>
        
      </React.Fragment>);
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
    error : state.offers.errorInOffer,
    loggedInUser : state.auth.loggedInUser
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Offer));