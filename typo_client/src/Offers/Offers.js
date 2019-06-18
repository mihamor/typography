import React, { Component } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';

function CustomCard({title, text, footer, imageUrl}){

return (
  <Card className="card">
    <Card.Img variant="top" src={imageUrl} />
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

class Offers extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
  }

  render() {
    return (
    <div className="offers">
      <CardDeck className="offers__deck">
        <CustomCard title={"Card Title"} text={
          `This is a wider card with supporting text below as a natural lead-in to 
          additional content. This content is a little bit longer.`}
         footer={"Last updated 3 mins ago"}
         imageUrl={"holder.js/100px160"}/>
         <CustomCard title={"Card Title"} text={
          `This is a wider card with supporting text below as a natural lead-in to 
          additional content. This content is a little bit longer.`}
         footer={"Last updated 3 mins ago"}
         imageUrl={"holder.js/100px160"}/>
         <CustomCard title={"Card Title"} text={
          `This is a wider card with supporting text below as a natural lead-in to 
          additional content. This content is a little bit longer.`}
         footer={"Last updated 3 mins ago"}
         imageUrl={"holder.js/100px160"}/>
      </CardDeck>
    </div>);
  }
} 

export default Offers;
