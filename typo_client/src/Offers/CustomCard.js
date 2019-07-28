import React from 'react';
import Card from 'react-bootstrap/Card';
import useReactRouter from 'use-react-router';


function CustomCard({title, text, footer, imageUrl, id}){
  const { history } = useReactRouter();
  const onCardClick = () => {
    history.push(`/offers/${id}`);
  }
  return (
  <Card onClick={onCardClick} className="card card_bounds card_scale">
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

export default CustomCard;