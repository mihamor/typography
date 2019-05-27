import {
  CHANGE_LOCATION
} from '../actions/location';


const initialState = {
  currentLocation : "/",
};



function location(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCATION:
      return Object.assign({}, state, {
        currentLocation : action.newLocation
      })
    default:
      return state;
  }
}





function combinedReducer(state = initialState, action){
switch (action.type) {
  case CHANGE_LOCATION:
    return location(state, action);
  default:
    return state;
}
}
export default combinedReducer;