import { fetchFeeds, fetchPlugins, fetchFeed } from '../actions/api';
// import { setFeed } from '../actions/navActions';

const setFeed = feed => dispatch => {
  if (feed) {
    return dispatch(fetchPlugins(feed)).then(() => {
      dispatch({ type: 'SET_FEED', setFeed: feed });
      dispatch(fetchFeed(feed)).then(() => {});
    }, err => {
      console.log('fetchPlugins: ', err);
    });
  } else {
    return dispatch({type: 'SET_FEED', setFeed: null});
  }
};

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
    default:
      break;
  }
};