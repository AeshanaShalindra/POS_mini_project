import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { ordering } from './ordering.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {orders} from './orders.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  ordering,
  orders
});

export default rootReducer;