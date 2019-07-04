import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

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

export default CustomCard;