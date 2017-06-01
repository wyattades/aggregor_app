import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator, NavigationActions, NavigationTransitionProps } from 'react-navigation';
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

// TODO: remove headers for login and register page, make it look more modern
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

  _handleBack = () => {
    const { nav: { routes }, dispatch } = this.props;
    if (routes.length > 1 || (routes[0].routes && routes[0].routes.length > 1)) {
      dispatch(NavigationActions.back());
      return true; // do not exit app
    } else if (routes) {

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

Navigator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

export default connect(state => ({
  nav: state.nav,
}))(Navigator);