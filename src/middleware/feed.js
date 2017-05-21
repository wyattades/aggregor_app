import { fetchFeeds, fetchPlugins } from '../actions/api';
import { setFeed } from '../actions/navActions';

export default store => next => action => {
  next(action);

  if (
    (action.type === 'persist/REHYDRATE' && action.payload && 
    action.payload.user && action.payload.user.isLoggedIn === true) || 
    action.type === 'SET_USER'
  ) {
    store.dispatch(fetchFeeds()).catch(console.log);

  } else if (action.type === 'SET_FEEDS') {
    if (action.feedNames.length > 0) {
      store.dispatch(setFeed(action.feedNames[0]));
    } else {
      store.dispatch(setFeed());
    }

  } else if (action.type === 'DELETE_FEED') {
    const newFeeds = store.getState().feeds.remove(action.type.feed);
    if (newFeeds.size > 0) {
      store.dispatch(setFeed(newFeeds.first().get('name')));
    } else {
      store.dispatch(setFeed());
    }

  } else if (action.type === 'ADD_FEED') {
    store.dispatch(setFeed(action.feed));

  } else if (action.type === 'SET_FEED') {
    store.dispatch(fetchPlugins(action.feed)).catch(console.log);
  }
};