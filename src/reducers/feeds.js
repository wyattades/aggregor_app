import { OrderedMap, List } from 'immutable';

import { PluginRecord, EntryRecord, FeedRecord } from '../utils/records';

// TODO: flatten reducers... maybe in my next lifetime

const entries = (state = List(), action) => {
  switch (action.type) {
    case 'APPEND_ENTRIES':
      if (!action.page) {
        return List();
      } else if (action.page <= 1) {
        return List(action.entries.map(_entry => new EntryRecord(_entry)));
      }
      return state.concat(action.entries.map(_entry => new EntryRecord(_entry)));

    default:
      return state;
  }
};

const plugin = (state, action) => {
  switch (action.type) {
    case 'ADD_PLUGIN':
      return new PluginRecord(action.data);
    case 'UPDATE_PLUGIN':
      return state.mergeDeep(action.data);
    default:
      return state;
  }
};

const plugins = (state, action) => {
  switch (action.type) {
    case 'SET_PLUGINS':
      return OrderedMap(action.plugins.map(_plugin => [_plugin.id, new PluginRecord(_plugin)]));
    case 'ADD_PLUGIN':
      return state.concat({ [action.id]: plugin(undefined, action) });
    case 'UPDATE_PLUGIN':
      return state.update(action.id, _plugin => plugin(_plugin, action));
    case 'DELETE_PLUGIN':
      return state.remove(action.id);
    case 'SET_ERRORS':
      if (action.errors) {
        return state.map((_plugin, id) => _plugin.set('error', action.errors[id]));
      } else if (action.err) {
        return state.map(_plugin => _plugin.set('error', action.err));
      } else {
        return state;
      }
    default:
      return state;
  }
};

const feed = (state, action) => {
  switch (action.type) {
    case 'SET_FEED_DEFAULT':
      return state.set('default', state.get('name') === action.feed);
    case 'SET_PLUGINS':
    case 'ADD_PLUGIN':
    case 'DELETE_PLUGIN':
    case 'UPDATE_PLUGIN':
    case 'SET_ERRORS':
      return state.update('plugins', _plugins => plugins(_plugins, action));
    case 'APPEND_ENTRIES':
      return state.update('entries', _entries => entries(_entries, action));
    default:
      return state;
  }
};

const feeds = (state = OrderedMap(), action) => {
  switch (action.type) {
    case 'ADD_FEED':
      return state.concat({ [action.feed]: new FeedRecord({ name: action.feed }) });
    case 'SET_FEED_DEFAULT':
      return state.map(_feed => feed(_feed, action));
    case 'SET_PLUGINS':
    case 'ADD_PLUGIN':
    case 'UPDATE_PLUGIN':
    case 'DELETE_PLUGIN':
    case 'APPEND_ENTRIES':
    case 'SET_ERRORS':
      return state.update(action.feed, _feed => feed(_feed, action));
    case 'DELETE_FEED':
      return state.remove(action.feed);
    case 'UPDATE_FEED':
      return state.set(action.name, state.get(action.feed)).remove(action.feed);
    case 'SET_FEEDS':
      return OrderedMap(action.feedNames.map(name => [name, new FeedRecord({ name })]));
    case 'UNSET_USER':
      return OrderedMap();
    default:
      return state;
  }
};

export default feeds;
