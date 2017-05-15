import { AppNavigator } from '../navigator';
// import { NavigationActions } from 'react-navigation';

// const initialState = AppNavigator.router.getStateForAction(NavigationActions.reset({ index: 0, actions: [ NavigationActions.navigate({ routeName: 'Login' }) ] }));
// const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
// const initialState = AppNavigator.router.getStateForAction(firstAction);
// const secondAction = AppNavigator.router.getActionForPathAndParams('Login');
// const initialState = AppNavigator.router.getStateForAction(secondAction, tempNavState);

export default (state, action) => {
  let nextState;
  switch (action.type) {
    // case 'SET_USER':
    //   nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Dashboard' }), state);
    //   break;
    // case 'UNSET_USER':
    //   nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }), state);
    //   break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
};
