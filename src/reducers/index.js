import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import nav from './nav';
import user from './user';
import feeds from './feeds';
import prompt from './prompt';
import { plugin_types, plugin_array } from './plugin_types';

export default combineReducers({
  form,
  nav,
  user,
  feeds,
  prompt,
  plugin_types,
  plugin_array,
});
