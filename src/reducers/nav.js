import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigator';

const goLogin = (params = {}) =>
  NavigationActions.reset({
    index: 0,
    actions: [ NavigationActions.navigate({ routeName: 'Login', params }) ],
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

export default (state, action) => {
  let nextState;
  switch (action.type) {

    case 'UNSET_USER':
      nextState = AppNavigator.router.getStateForAction(goLogin(action.params));
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
