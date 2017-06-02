import { NavigationActions } from 'react-navigation';

import { fetchPlugins, fetchFeed } from './api';

export const goLogin = params => NavigationActions.reset({ 
  index: 0, 
  actions: [ NavigationActions.navigate({ routeName: 'Login', params }) ] 
});

export const goHome = (selectedFeed, goToEdit) => {
  const homeActions = [ NavigationActions.navigate({
    routeName: 'Dashboard',
    params: { selectedFeed },
  }) ];
  if (goToEdit) {
    homeActions.push(NavigationActions.navigate({
      routeName: 'FeedEdit',
      params: { selectedFeed },
    }));
  }

  return NavigationActions.reset({ 
    index: 0, 
    actions: [ NavigationActions.navigate({ 
      routeName: 'Main', 
      action: NavigationActions.reset({
        index: goToEdit ? 1 : 0,
        actions: homeActions,
      }) 
    }) ] 
  });
}

export const setFeed = (feed, goToEdit) => dispatch => {
  if (feed) {
    return dispatch(fetchPlugins(feed)).then(() => {
      dispatch({ type: 'SET_FEED', setFeed: feed, goToEdit });
      dispatch(fetchFeed(feed)).then(() => {});
    }, err => {
      console.log('fetchPlugins: ', err);
    });
  } else {
    return dispatch({type: 'SET_FEED', setFeed: null });
  }
};
 
// export const navigate = (screen) => NavigationActions.navigate({ routeName: screen });