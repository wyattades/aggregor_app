import { AppNavigator } from '../navigator';

import { init } from '../actions/navActions';

export default (state, action) => {
  let nextState;
  switch (action.type) {
    
    case 'persist/REHYDRATE':
      const isLoggedIn = action.payload && action.payload.user && action.payload.user.isLoggedIn === true;
      if (!isLoggedIn) {
        nextState = AppNavigator.router.getStateForAction(init('Login'));   
      }
      break;

    case 'API_ERROR':
      nextState = AppNavigator.router.getStateForAction(init('Login', { apiError: action.err }));
      break;

    case 'UNSET_USER':
      nextState = AppNavigator.router.getStateForAction(init('Login'));
      break;

    case 'SET_FEEDS':
      nextState = AppNavigator.router.getStateForAction(init('Main'));
      break;

    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
};

// TODO: pass params for selected feed in here!