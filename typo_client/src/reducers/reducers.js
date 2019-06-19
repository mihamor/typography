import offers from './offers';
import location from './location';
import auth from './auth';
import { combineReducers } from 'redux';

export default combineReducers({
  offers,
  auth,
  location
}); 