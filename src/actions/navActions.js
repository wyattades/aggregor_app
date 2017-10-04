import { push, goBack as _goBack, replace } from 'react-router-redux';

import { fetchPlugins, fetchFeed } from './api';
import { formatError } from '../utils/format';

// Rename to backEditor
export const goBack = () => dispatch => dispatch(_goBack());

export const goMainPage = name => dispatch => dispatch(replace(`/${name}`));

export const goLogin = (params = {}) => dispatch => {

  if (params.err) {
    params.err = formatError(params.err);
  }

  dispatch({ type: 'UNSET_USER' });
  dispatch(replace({ pathname: '/login', query: params }));
};

// Rename to pushEditor
export const pushHome = (feed, plugin) => dispatch => {
  const path = plugin ? `/${plugin}` : '';
  dispatch(push(`/feed/${feed}/edit${path}`));
};

export const goHome = (feed = null, goToEdit) => dispatch => {
  let path = '/feed';
  let actions = [];

  if (feed) {
    path += `/${feed}`;
    if (goToEdit) {
      actions.push(`/feed/${feed}/edit`);
      if (typeof goToEdit === 'string') {
        actions.push(`/feed/${feed}/edit/${goToEdit}`);
      }
    }
  }

  dispatch(replace(path));
  for (let action of actions) {
    dispatch(push(action));
  }
};

export const setFeed = (feed, goToEdit) => dispatch => {
  if (feed) {
    dispatch(goHome(feed, goToEdit));
    
    return dispatch(fetchPlugins(feed))
    .then(() => dispatch(fetchFeed(feed)));
  } else {
    return dispatch(goHome());
  }
};
