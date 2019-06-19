import {
  REQUEST_OFFERS,
  RECEIVE_OFFERS,
  REQUEST_OFFER_BY_ID,
  RECEIVE_OFFER_BY_ID,
  RECEIVE_INSERT_COMMENT,
  REQUEST_INSERT_COMMENT,
  SET_OFFER_DATA
} from '../actions/offers';

const initialState = {
    offersData : null,
    offerData : null,
    error : null,
    errorInOffer : null,
    errorInComment : null,
    isFetchingOffers : false,
    isFetchingOffer : false,
    isFetchingInsert : false
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
        errorInOffer : null,
        isFetchingOffer : true
      })
    case RECEIVE_OFFER_BY_ID:
      return Object.assign({}, state, {
        offerData : action.offerData,
        errorInOffer : action.error,
        isFetchingOffer : false
      })
    default:
      return state;
  }
}


function comments(state = initialState, action) {
  switch (action.type) {
    case REQUEST_INSERT_COMMENT:
      return Object.assign({}, state, {
        errorInComment : null,
        isFetchingInsert : true
      })
    case RECEIVE_INSERT_COMMENT:
      return Object.assign({}, state, {
        errorInComment : action.error,
        isFetchingInsert : false
      })
    case SET_OFFER_DATA:
      return Object.assign({}, state, {
        offerData : action.offerData,
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
    case REQUEST_INSERT_COMMENT:
    case RECEIVE_INSERT_COMMENT:
    case SET_OFFER_DATA:
      return comments(state, action);
    default:
      return state;
    }
  }
  export default combinedReducer;