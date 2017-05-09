import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import React, { PropTypes } from 'react';

import Home from './containers/Home';
import Counter from './containers/Counter';
import Login from './containers/Login';

export const AppNavigator = new StackNavigator(
  {
    Login: { screen: Login },
    Home: { screen: Home },
    Counter: { screen: Counter },
  },
  {
    headerMode: 'screen'
  }
);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

export default connect(state => ({
  nav: state.nav,
}))(AppWithNavigationState);