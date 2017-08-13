import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import StackNavigator from 'react-navigation/lib/navigators/StackNavigator';
import DrawerNavigator from 'react-navigation/lib/navigators/DrawerNavigator';

import Dashboard from '../containers/Dashboard';
import Login from '../containers/Login';
import Register from '../containers/Register';
import FeedEdit from '../containers/FeedEdit';
import PluginEdit from '../containers/PluginEdit';
import Loading from '../containers/Loading';
import Account from '../containers/Account';
import About from '../containers/About';

import PushTransition from '../components/Transition';
import Drawer from '../components/Drawer';
import { MainHeader } from '../components/Header';
// import StackNavigator from './StackNavigator';
// import DrawerNavigator from './DrawerNavigator';

// TODO: implement browserAppContainer for web (for hash routing)

// TODO: StackNavigator and DrawerNavigator should be less "mobile" focused
// - Drawer menu shouldn't blur app, should stay open

const largeScreen = Dimensions.get('window').width > 500;

const MainPage = (Content, title) => () => (
  <View style={{ flex: 1 }}>
    <MainHeader
      navigation={this.props.navigation}
      title={title}/>
    <Content/>
  </View>
);

const HomeNavigator = new StackNavigator({
  Dashboard: {
    screen: Dashboard,
    path: '',
  },
  FeedEdit: {
    screen: FeedEdit,
    path: ':feed/edit',
  },
  PluginEdit: {
    screen: PluginEdit,
    path: ':feed/edit/:plugin',
  },
}, {
  initialRouteName: 'Dashboard',
});

const MainNavigator = new DrawerNavigator({
  Home: {
    screen: HomeNavigator,
    path: 'feed',
  },
  Account: {
    screen: MainPage(Account, 'Account'),
    path: 'account',
  },
  About: {
    screen: MainPage(About, 'About'),
    path: 'about',
  },
}, Object.assign({
  initialRouteName: 'Home',
  contentComponent: Drawer,
}, largeScreen ? {
  drawerWidth: 400,
} : undefined));

export const AppNavigator = new StackNavigator({
  Register: {
    screen: Register,
    path: 'register',
  },
  Login: {
    screen: Login,
    path: 'login',
  },
  Main: {
    screen: MainNavigator,
  },
  Loading: {
    screen: Loading,
  },
}, {
  headerMode: 'none',
  transitionConfig: PushTransition,
  initialRouteName: 'Loading',
});

class Navigator extends Component {

  componentWillMount() {
    if (this.props.backHandler) {
      this.props.backHandler.addEventListener('hardwareBackPress', this._handleBack);
    }
  }

  componentWillUnmount() {
    if (this.props.backHandler) {
      this.props.backHandler.removeEventListener('hardwareBackPress', this._handleBack);
    }
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
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
    );
  }
}

Navigator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

export default connect(({ nav }) => ({
  nav,
}))(Navigator);
