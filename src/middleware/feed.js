import { fetchFeeds } from '../actions/api';
import { setFeed } from '../actions/navActions';

export default store => next => action => {

  if (
    (action.type === 'persist/REHYDRATE' && action.payload && 
    action.payload.user && action.payload.user.isLoggedIn === true) || 
    action.type === 'SET_USER'
  ) {
    next(action);
    store.dispatch(fetchFeeds());

  } else if (action.type === 'SET_FEEDS') {
    if (action.feedNames.length > 0) {
      next(setFeed(action.feedNames[0]));
    } else {
      next(setFeed());
    }
    next(action);

  } else if (action.type === 'DELETE_FEED') {
    const newFeeds = store.getState().feeds.remove(action.type.feed);
    if (newFeeds.size > 0) {
      next(setFeed(newFeeds.first().get('name')));
    } else {
      next(setFeed());
    }
    next(action);

  } else if (action.type === 'ADD_FEED') {
    next(action);
    store.dispatch(setFeed(action.feed));

  } else {
    next(action);
  }
};