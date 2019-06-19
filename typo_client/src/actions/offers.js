import DB from '../db/db';

export const REQUEST_OFFERS = 'REQUEST_OFFERS';

export function requestOffers() {
  return {
    type : REQUEST_OFFERS,
    error : null
  }
}

export const RECEIVE_OFFERS = 'RECEIVE_OFFERS';
export function receiveOffers(offersData, err) {
  return {
    type : RECEIVE_OFFERS,
    offersData : offersData,
    error : err
  }
}

export const REQUEST_OFFER_BY_ID = 'REQUEST_OFFER_BY_ID';

export function requestOfferById() {
  return {
    type : REQUEST_OFFER_BY_ID,
    error : null
  }
}

export const RECEIVE_OFFER_BY_ID = 'RECEIVE_OFFER_BY_ID';
export function receiveOfferById(offerData, err) {
  return {
    type : RECEIVE_OFFER_BY_ID,
    offerData : offerData,
    error : err
  }
}



export function fetchOffers() {
  return dispatch => {
    dispatch(requestOffers());
    return DB.getOffers()
      .then (data => dispatch(receiveOffers(data)))
      .catch(err => dispatch(receiveOffers(null, err)));
  };
}

export function fetchOfferById(id) {
  return dispatch => {
    dispatch(requestOfferById());
    return DB.getOfferById(id)
      .then (data => dispatch(receiveOfferById(data)))
      .catch(err => dispatch(receiveOfferById(null, err)));
  };
}