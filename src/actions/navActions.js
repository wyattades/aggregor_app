import { NavigationActions } from 'react-navigation';

// export const init = (screen, params) => NavigationActions.reset({ 
//   index: 0, 
//   actions: [ NavigationActions.navigate({ routeName: screen, params: params || undefined }) ] 
// });

export const goLogin = apiError => NavigationActions.reset({ 
  index: 0, 
  actions: [ NavigationActions.navigate({ routeName: 'Login', params: { apiError } }) ] 
});

export const goHome = (selectedFeed, screen) => NavigationActions.reset({ 
  index: 0, 
  actions: [ NavigationActions.navigate({ 
    routeName: 'Main', 
    action: NavigationActions.navigate({
      routeName: 'Home',
      params: { selectedFeed },
      action: !screen ? undefined : NavigationActions.navigate({
        routeName: screen
      })
    }) 
  }) ] 
});

// export const setFeed = feed => (dispatch) => 
 
// export const setFeed = (feed) => ({ type: 'SET_FEED', feed: feed || null });

// export const navigate = (screen) => NavigationActions.navigate({ routeName: screen });