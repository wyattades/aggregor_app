import { fetchFeeds } from '../actions/api';
import { ToastAndroid } from 'react-native';
import { setFeed } from '../actions/navActions';

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
    case 'DELETE_FEED':
      const newFeeds = store.getState().feeds.remove(action.type.feed);
      const first = newFeeds.first();
      store.dispatch(setFeed(first ? first.get('name') : null));
      break;
    case 'ADD_FEED':
      store.dispatch(setFeed(action.feed));
      break;
    case 'NETWORK_ERROR':
      ToastAndroid.show('Failed to connect to Aggregor server', ToastAndroid.SHORT);
      break;
    default:
      break;
  }
};