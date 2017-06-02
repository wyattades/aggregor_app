import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import React, { Component, PropTypes } from 'react';
import { BackHandler, View } from 'react-native';

import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import Register from './containers/Register';
import FeedEdit from './containers/FeedEdit';
import PluginEdit from './containers/PluginEdit';
import Loading from './containers/Loading';
import Account from './containers/Account';
import About from './containers/About';
// import WebContent from './containers/WebContent';

import Drawer from './components/Drawer';
import { DashboardHeader, FeedEditHeader, PluginEditHeader, MainHeader } from './components/Header';

const MainPage = (Content, title) => (
  class extends Component {
    render() {
      return (
        <View style={{ flex: 1 }}>
          <MainHeader 
            navigation={this.props.navigation}
            title={title}/>
          <Content/>
        </View>
      );
    }
  }
);

const HomeNavigator = new StackNavigator(
  {
    Dashboard: { 
      screen : Dashboard,
      navigationOptions: { header: DashboardHeader }
    },
    FeedEdit: {
      screen: FeedEdit,
      navigationOptions: { header: FeedEditHeader }
    },
    PluginEdit: {
      screen: PluginEdit,
      navigationOptions: { header: PluginEditHeader },
    },
    // WebContent: {
    //   screen: WebContent,
    //   navigationOptions: ({ navigation }) => {
    //     const { title } = navigation.state.params;
    //     return {
    //       title,
    //       headerStyle: headerStyles.webContentHeader,
    //       headerTitleStyle: headerStyles.webContentTitle,
    //       headerTintColor: 'black',
    //     };
    //   }
    // }
  }, {
    initialRouteName: 'Dashboard',
  }
);

const MainNavigator = new DrawerNavigator(
  {
    Home: { 
      screen: HomeNavigator
    },
    Account: { 
      screen: MainPage(Account, 'Account') 
    },
    About: { 
      screen: MainPage(About, 'About') 
    },
  }, {
    initialRouteName: 'Home',
    contentComponent: Drawer,
  }
);

export const AppNavigator = new StackNavigator(
  {
    Register: { 
      screen: Register
    },
    Login: { 
      screen: Login
    },
    Main: { 
      screen: MainNavigator
    },
    Loading: { 
      screen: Loading
    },
  }, {
    headerMode: 'none',
    transitionConfig: () => ({

    }),
    initialRouteName: 'Loading',
  }
);

class Navigator extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
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

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBack);
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
    );
  }
}

export default connect(({ nav }) => ({
  nav
}))(Navigator);