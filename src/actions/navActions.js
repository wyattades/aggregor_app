import { NavigationActions } from 'react-navigation';

export const init = (screen, params) => NavigationActions.reset({ 
  index: 0, 
  actions: [ NavigationActions.navigate({ routeName: screen, params: params || undefined }) ] 
});
 
export const setFeed = (feed) => ({ type: 'SET_FEED', feed: feed || null });

export const navigate = (screen) => NavigationActions.navigate({ routeName: screen });