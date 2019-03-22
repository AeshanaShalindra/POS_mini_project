import { orderConstants } from '../_constants';

let order = JSON.parse(localStorage.getItem('order'));
const initialState = order ? { ordering: true, order } : {};

export function ordering(state = initialState, action) {
  switch (action.type) {
    case orderConstants.ORDER_REQUEST:
      return {
        ordering: true,
        user: action.user
      };
    case orderConstants.ORDER_SUCCESS:
      return {
        ordering: true,
        order: action.order
      };
    case orderConstants.ORDER_FAILURE:
      return {};
    
    default:
      return state
  }
}