import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import counter from './counter';
import nav from './nav';
import user from './user';

export default combineReducers({
  counter,
  nav,
  user,
  form
});
