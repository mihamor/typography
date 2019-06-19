import {
  REQUEST_OFFERS,
  RECEIVE_OFFERS,
  REQUEST_OFFER_BY_ID,
  RECEIVE_OFFER_BY_ID
} from '../actions/offers';

const initialState = {
    offersData : null,
    offerData : null,
    error : null,
    isFetchingOffers : false,
    isFetchingOffer : false
};

function offers(state = initialState, action) {
  switch (action.type) {
    case REQUEST_OFFERS:
      return Object.assign({}, state, {
        error : null,
        isFetchingOffers : true
      })
    case RECEIVE_OFFERS:
      return Object.assign({}, state, {
        offersData : action.offersData,
        error : action.error,
        isFetchingOffers : false
      })
    case REQUEST_OFFER_BY_ID:
      return Object.assign({}, state, {
        error : null,
        isFetchingOffer : true
      })
    case RECEIVE_OFFER_BY_ID:
      return Object.assign({}, state, {
        offerData : action.offerData,
        error : action.error,
        isFetchingOffer : false
      })
    default:
      return state;
  }
}

function combinedReducer(state = initialState, action){
  switch (action.type) {
    case REQUEST_OFFERS:
    case RECEIVE_OFFERS:
    case REQUEST_OFFER_BY_ID:
    case RECEIVE_OFFER_BY_ID:
      return offers(state, action);
    default:
      return state;
    }
  }
  export default combinedReducer;