import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import CustomCard from './CustomCard';

function CustomCardDeck({cards}){
  let resultToRender = null;
  if(cards.length === 0) resultToRender = <h1 className="offers__deck">Not found...</h1>;
  else resultToRender = (
  <CardDeck className="offers__deck">
    { cards.map( doc => {
        return <CustomCard title={doc.data.name} text={doc.data.description}
        footer={`Price per unit: ${doc.data.price} UAH`}
        imageUrl={doc.data.image_url}
        id={doc.id}
        key={doc.id}/>
    })}
  </CardDeck>);
  return resultToRender;
}

export default CustomCardDeck;