import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import rehydrating from './rehydrating';
import user from './user';
import feeds from './feeds';
import prompt from './prompt';
import alert from './alert';
// import setFeed from './setFeed';
import { plugin_types, plugin_array } from './plugin_types';

export default combineReducers({
  form,
  rehydrating,
  user,
  feeds,
  prompt,
  alert,
  plugin_types,
  plugin_array,
  // setFeed,
});
