import offers from './offers';
import auth from './auth';
import { combineReducers } from 'redux';

export default combineReducers({
  offers,
  auth
}); 