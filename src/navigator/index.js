import React from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import navigatorWrapper from './navigatorWrapper';
// import StackNavigator from './StackNavigator';
// import DrawerNavigator from './DrawerNavigator';

// TODO: StackNavigator and DrawerNavigator should be less "mobile" focused
// - Drawer menu shouldn't blur app, should stay open
// - Drawer state should not show in url

const largeScreen = Dimensions.get('window').width > 500;

const MainPage = (Content, title) => ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <MainHeader
      navigation={navigation}
      title={title}/>
    <Content/>
  </View>
);

MainPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const HomeNavigator = new StackNavigator({
 
  EmptyDashboard: {
    screen: Dashboard,
    path: '',
  },
  Dashboard: {
    screen: Dashboard,
    path: ':selectedFeed',
  },
  FeedEdit: {
    screen: FeedEdit,
    path: ':selectedFeed/edit',
  },
  PluginEdit: {
    screen: PluginEdit,
    path: ':selectedFeed/edit/:plugin',
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
    path: 'main',
  },
  Loading: {
    screen: Loading,
    path: 'loading',
  },
}, {
  headerMode: 'none',
  transitionConfig: PushTransition,
  initialRouteName: 'Loading',
});

const Navigator = navigatorWrapper(AppNavigator);

Navigator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default connect(({ nav }) => ({
  state: nav,
}))(Navigator);
