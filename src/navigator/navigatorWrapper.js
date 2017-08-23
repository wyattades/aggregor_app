import React, { Component } from 'react';
import { BackAndroid } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';

export default NavComponent => class extends Component {

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBack);
  }

  _handleBack = () => {

    const { nav: { routes }, dispatch } = this.props;
    const route = routes[0].routes && routes[0].routes[0];

    if ((routes[0].index > 0) || (route && route.routes && route.routes[0].index > 0)) {
      dispatch(NavigationActions.back());
      return true; // do not exit app
    } else {
      return false; // exit app
    }
  }

  render() {
    const { dispatch, state } = this.props;
    return (
      <NavComponent navigation={addNavigationHelpers({ dispatch, state })} />
    );
  }
};
