import { NavigationActions } from 'react-navigation';

import { fetchPlugins, fetchFeed } from './api';

export const goLogin = apiError => NavigationActions.reset({ 
  index: 0, 
  actions: [ NavigationActions.navigate({ routeName: 'Login', params: { apiError } }) ] 
});

export const goHome = (selectedFeed, goToEdit) => NavigationActions.reset({ 
  index: 0, 
  actions: [ NavigationActions.navigate({ 
    routeName: 'Main', 
    action: NavigationActions.navigate({
      routeName: 'Home',
      params: { selectedFeed },
      action: !goToEdit ? undefined : NavigationActions.navigate({
        routeName: 'FeedEdit',
        params: { selectedFeed },
      })
    }) 
  }) ] 
});

export const setFeed = (feed, goToEdit) => dispatch => {
  if (feed) {
    return dispatch(fetchPlugins(feed)).then(() => {
      dispatch({ type: 'SET_FEED', setFeed: feed, goToEdit });
      dispatch(fetchFeed(feed)).then(() => {});
    }, err => {
      console.log('fetchPlugins: ', err);
    });
  } else {
    return dispatch({type: 'SET_FEED', setFeed: null, goToEdit });
  }
};
 
// export const navigate = (screen) => NavigationActions.navigate({ routeName: screen });