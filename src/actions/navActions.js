import { fetchPlugins, fetchFeed } from './api';
import { formatError } from '../utils/format';

export const goLogin = (params = {}) => {

  if (params.err) {
    params.err = formatError(params.err);
  }

  return { type: 'UNSET_USER', params };
};

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
