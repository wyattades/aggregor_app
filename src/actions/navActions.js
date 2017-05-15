import { NavigationActions } from 'react-navigation';

export const init = (screen) => NavigationActions.reset({ 
  index: 0, 
  actions: [ NavigationActions.navigate({ routeName: screen }) ] 
});