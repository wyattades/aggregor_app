import { ToastAndroid } from 'react-native';

import { fetchFeeds } from '../actions/api';
import { setFeed } from '../actions/navActions';

// TODO: move these cases to their corresponding functions in api.js

export default store => next => action => {
  next(action);

  switch (action.type) {
    case 'persist/REHYDRATE':
      if (action.payload && action.payload.user && action.payload.user.isLoggedIn === true) {
        store.dispatch(fetchFeeds());
      }
      break;
    case 'SET_USER':
      store.dispatch(fetchFeeds());
      break;
    case 'SET_FEEDS':
      const feed = action.feedNames.length > 0 ? action.feedNames[0] : null;
      store.dispatch(setFeed(feed));
      break;
    case 'ADD_FEED':
      store.dispatch(setFeed(action.feed, true));
      break;
    case 'NETWORK_ERROR':
      ToastAndroid.show('Failed to connect to Aggregor server', ToastAndroid.SHORT);
      break;
    default:
      break;
  }
};