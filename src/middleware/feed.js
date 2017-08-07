import alert from '../utils/alert';
import { fetchFeeds, fetchUser, fetchAvailablePlugins } from '../actions/api';
import { setFeed } from '../actions/navActions';

// TODO: move these cases to their corresponding functions in api.js

const loadInit = (dispatch, isLoggedIn) => Promise.all([
  dispatch(fetchAvailablePlugins()), 
  isLoggedIn ? dispatch(fetchUser()) : true,
  isLoggedIn ? dispatch(fetchFeeds()) : true,
])
.catch(err => {
  if (err.code === 401 || err.code === 0) {
    dispatch({ type: 'UNSET_USER' });
  }
});

export default store => next => action => {
  next(action);

  switch (action.type) {
    case 'persist/REHYDRATE':
      const isLoggedIn = action.payload && action.payload.user && action.payload.user.isLoggedIn === true;
      loadInit(store.dispatch, isLoggedIn);
      break;      
    case 'SET_USER':
      loadInit(store.dispatch, true);
      break;
    case 'SET_FEEDS':
      const feed = action.feedNames.length > 0 ? action.feedNames[0] : null;
      store.dispatch(setFeed(feed));
      break;
    case 'ADD_FEED':
      store.dispatch(setFeed(action.feed, true));
      break;
    case 'NETWORK_ERROR':
      alert('Failed to connect to Aggregor server. Please try again later.');
      break;
    default:
      break;
  }
};