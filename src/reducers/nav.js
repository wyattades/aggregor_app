import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigator';

const goLogin = (params = {}) =>
  NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login', params })],
  });

const goHome = (selectedFeed, goToEdit) => {
  const homeActions = [
    NavigationActions.navigate({
      routeName: selectedFeed ? 'Dashboard' : 'EmptyDashboard',
      params: { selectedFeed },
    }),
  ];

  if (goToEdit) {
    homeActions.push(
      NavigationActions.navigate({
        routeName: 'FeedEdit',
        params: { selectedFeed },
      }),
    );
  }

  return NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'Main',
        action: NavigationActions.reset({
          index: goToEdit ? 1 : 0,
          actions: homeActions,
        }),
      }),
    ],
  });
};

// TODO: prevent duplicate route transtions

// const shallowEqual = (params1, params2) => {
//   if (params1 === undefined && params2 === undefined) {
//     return true;
//   }
//   if (params1 === undefined || params2 === undefined) {
//     return false;
//   }

//   const keys = Object.keys(params1);
//   for (let i = 0; i < keys.length; i++) {
//     const key = keys[i];
//     if (params1[key] !== params2[key]) {
//       return false;
//     }
//   }
//   return true;
// };

export default (state, action) => {
  let nextState;
  switch (action.type) {
    // Prevent duplicate route transitions
    // case 'Navigation/NAVIGATE':
    //   const { routes, index } = state;
    //   const { routeName, params } = action;

    //   const currentRoute = routes[index];
    //   const lastScene = currentRoute.routes[currentRoute.routes.length - 1];

    //   // Check for duplication
    //   if (!lastScene.routeName === routeName || !shallowEqual(lastScene.params, params)) {
    //       nextState = AppNavigator.router.getStateForAction(action, state);
    //   }
    //   break;

    case 'persist/REHYDRATE':
      const isLoggedIn = action.payload && action.payload.user && action.payload.user.isLoggedIn === true;
      if (!isLoggedIn) {
        nextState = AppNavigator.router.getStateForAction(goLogin({ init: true }));
      } else {
        nextState = AppNavigator.router.getStateForAction(action, state);
      }
      break;

    case 'UNSET_USER':
      nextState = AppNavigator.router.getStateForAction(goLogin(action.err ? { apiError: action.err } : {}));
      break;

    case 'SET_FEED':
      nextState = AppNavigator.router.getStateForAction(goHome(action.feed, action.goToEdit));
      break;

    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
};
