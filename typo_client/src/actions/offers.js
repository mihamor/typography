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


export function fetchOffers() {
  return dispatch => {
    dispatch(requestOffers());
    return DB.getOffers()
      .then (data => dispatch(receiveOffers(data)))
      .catch(err => dispatch(receiveOffers(null, err)));
  };
}