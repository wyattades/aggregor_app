import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import nav from './nav';
import user from './user';
import feeds from './feeds';
import selectedFeed from './selectedFeed';

export default combineReducers({
  form,
  nav,
  user,
  feeds,
  selectedFeed,
});
