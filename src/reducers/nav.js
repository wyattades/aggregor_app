import { AppNavigator } from '../navigator';

import { goLogin, goHome } from '../actions/navActions';

export default (state, action) => {
  let nextState;
  switch (action.type) {
    
    case 'persist/REHYDRATE':
      const isLoggedIn = action.payload && action.payload.user && action.payload.user.isLoggedIn === true;
      if (!isLoggedIn) {
        nextState = AppNavigator.router.getStateForAction(goLogin());   
      }
      break;

    case 'UNSET_USER':
      nextState = AppNavigator.router.getStateForAction(goLogin(action.err));
      break;

    case 'SET_FEED':
      nextState = AppNavigator.router.getStateForAction(goHome(action.setFeed));
      break;

    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
};
