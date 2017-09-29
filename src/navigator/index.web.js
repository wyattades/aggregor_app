import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StackNavigator from 'react-navigation/lib/navigators/StackNavigator';

import MyNavigator from './DrawerNavigator';

import Dashboard from '../containers/Dashboard';
import Login from '../containers/Login';
import Register from '../containers/Register';
import FeedEdit from '../containers/FeedEdit';
import PluginEdit from '../containers/PluginEdit';
import Loading from '../containers/Loading';
import Account from '../containers/Account';
import About from '../containers/About';
import ErrorPage from '../containers/ErrorPage';

import { pushTransition } from '../utils/transitions';
import Drawer from '../components/Drawer';
import navigatorWrapper from './navigatorWrapper';

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

const MainNavigator = new MyNavigator({
  Home: {
    screen: HomeNavigator,
    path: 'feed',
  },
  Account: {
    screen: Account,
    path: 'account',
  },
  About: {
    screen: About,
    path: 'about',
  },
}, {
  initialRouteName: 'Home',
  // contentComponent: Drawer,
});

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
  Error: {
    screen: ErrorPage,
    path: 'error',
  },
}, {
  headerMode: 'none',
  transitionConfig: pushTransition,
  initialRouteName: 'Loading',
});

const Navigator = navigatorWrapper(AppNavigator);

Navigator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default connect(({ nav, prompt }) => ({
  state: nav,
  isPromptOpen: prompt.visible,
}))(Navigator);
