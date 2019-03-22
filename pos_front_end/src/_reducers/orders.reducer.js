import { orderConstants } from '../_constants';

export function orders(state = {}, action) {
  switch (action.type) {
    case orderConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case orderConstants.GETALL_SUCCESS:
      return {
        items: action.orders
      };
    case orderConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case orderConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(order =>
          order._id === action._id
            ? { ...order, deleting: true }
            : order
        )
      };
    case orderConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(order => order._id !== action._id)
      };
    case orderConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(order => {
          if (order._id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...orderCopy } = order;
            // return copy of user with 'deleteError:[error]' property
            return { ...orderCopy, deleteError: action.error };
          }

          return order;
        })
      };
    default:
      return state
  }
}