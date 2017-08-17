import { fetchPlugins, fetchFeed } from './api';

export const goHome = (feed = null, goToEdit) => ({ type: 'SET_FEED', feed, goToEdit });

export const setFeed = (feed, goToEdit) => dispatch => {
  if (feed) {
    dispatch(goHome(feed, goToEdit));
    return dispatch(fetchPlugins(feed))
    .then(() => dispatch(fetchFeed(feed)));
  } else {
    return dispatch(goHome());
  }
};
