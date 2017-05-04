import { combineReducers } from 'redux';

import counter from './counter';
import nav from './nav';
import user from './user';

export default combineReducers({
  counter,
  nav,
  user
});
