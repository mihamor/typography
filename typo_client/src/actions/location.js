export const CHANGE_LOCATION = 'CHANGE_LOCATION';
export function changeLocation(data) {
  return {
    type: CHANGE_LOCATION,
    newLocation: data.newLocation
  }
}
