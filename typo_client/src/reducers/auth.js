import {
  AUTH_CHANGE
} from '../actions/auth';

const initialState = {
  loggedInUser : null,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_CHANGE:
      return Object.assign({}, state, {
        loggedInUser : action.user
      })
    default:
      return state;
  }
}

function combinedReducer(state = initialState, action){
  switch (action.type) {
    case AUTH_CHANGE:
      return auth(state, action);
    default:
      return state;
  }
}
export default combinedReducer;