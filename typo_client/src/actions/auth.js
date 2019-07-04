import DB from '../db/db';

export const AUTH_CHANGE = 'AUTH_CHANGE';
export function receiveUser(isLoggedIn) {
  const user = isLoggedIn ? DB.getLoggedInUser() : null;
  return {
    type : AUTH_CHANGE,
    user : user
  };
}