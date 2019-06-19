import {
  REQUEST_OFFERS,
  RECEIVE_OFFERS
} from '../actions/offers';

const initialState = {
    offersData : null,
    error : null,
    isFetchingOffers : true
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
    default:
      return state;
  }
}



function combinedReducer(state = initialState, action){
  switch (action.type) {
    case REQUEST_OFFERS:
    case RECEIVE_OFFERS:
      return offers(state, action);
    default:
      return state;
    }
  }
  export default combinedReducer;