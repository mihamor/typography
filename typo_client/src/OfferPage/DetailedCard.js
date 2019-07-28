import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PurchaseModal from './PurchaseModal';

class DetailedCard extends Component {
  constructor(props) {
    super(props);
    this.state = { modalShow: false };
  }
  
  render() {
    let modalClose = () => this.setState({ modalShow: false });
    const {title, text, footer, imageUrl} = this.props;
    return (
    <div className='card__container'>
      <Card className="text-center">
        <Card.Header>{title}</Card.Header>
        <Card.Img variant="top" className="card__full-img" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {text}
          </Card.Text>
          <Button 
            variant="primary" 
            onClick={() => this.setState({ modalShow: true })} 
            className="card__button">Purchase online</Button>
        </Card.Body>
        <Card.Footer className="text-muted">{footer}</Card.Footer>
      </Card>
      <PurchaseModal
        show={this.state.modalShow}
        onHide={modalClose}
      />
    </div>);
  }
}

export default DetailedCard;