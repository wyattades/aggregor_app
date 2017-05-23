import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import React, { Component, PropTypes } from 'react';
import { BackHandler } from 'react-native';

import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import Register from './containers/Register';
import FeedEdit from './containers/FeedEdit';
import PluginEdit from './containers/PluginEdit';
import Loading from './containers/Loading';
import Account from './containers/Account';
import About from './containers/About';
// import SplashScreen from './containers/SplashScreen';

import { HeaderButton } from './components/Header';
import Drawer from './components/Drawer';
import { HeaderLink } from './components/Header';
import { styles as headerStyles } from './components/Header';

import setupStyles from './utils/setupStyles';

const MainPage = (component, title) => {
  const label = 'Static-' + title;
  return new StackNavigator(
    {
      [label]: {
        screen: component,
        navigationOptions: {
          title
        }
      }
    }, {
      initialRouteName: label,
      navigationOptions: ({ navigation }) => ({
        title,
        headerStyle: headerStyles.header,
        headerTitleStyle: headerStyles.title,
        headerTintColor: 'white',
        headerLeft: <HeaderButton icon="menu" onPress={()=>navigation.navigate('DrawerOpen')}/>
      })
    }
  );
};

const HomeNavigator = new StackNavigator(
  {
    Dashboard: { 
      screen : Dashboard,
      navigationOptions: ({ navigation }) => {
        const selectedFeed = navigation.state.params.selectedFeed;
        return {
          title: 'Home' + (selectedFeed ? `: ${selectedFeed}` : ''),
          headerLeft: <HeaderButton icon="menu" onPress={()=>navigation.navigate('DrawerOpen')}/>,
          headerRight: selectedFeed ? <HeaderButton icon="edit" onPress={()=>navigation.navigate('FeedEdit', { selectedFeed })}/> : null
        };
      }
    },
    FeedEdit: {
      screen: FeedEdit,
      navigationOptions: ({ navigation }) => {
        const selectedFeed = navigation.state.params && navigation.state.params.selectedFeed;
        return {
          title: selectedFeed ? 'Edit ' + selectedFeed : 'Create Feed',
          headerLeft: selectedFeed ? undefined : <HeaderButton icon="close" onPress={()=>navigation.goBack()}/>
        };
      }
    },
    PluginEdit: {
      screen: PluginEdit,
      navigationOptions: ({ navigation }) => {
        const { selectedFeed, plugin } = navigation.state.params;
        return {
          title: (plugin ? 'Edit' : 'Add') + ' Plugin in ' + selectedFeed
        };
      }
    }
  }, {
    initialRouteName: 'Dashboard',
    navigationOptions: {
      headerStyle: headerStyles.header,
      headerTitleStyle: headerStyles.title,
      headerTintColor: 'white',
    }
  }
);

// const HomeNavigatorWrapper = connect(({ selectedFeed }) => ({ 
//   selectedFeed
// }))(({ selectedFeed, navigation }) => (
//   <HomeNavigator screenProps={{ selectedFeed, parentNavigation: navigation }}/>
// ));

const MainNavigator = new DrawerNavigator(
  {
    Home: { screen: HomeNavigator },
    Account: { 
      screen: MainPage(Account, 'Account')
    },
    About: { 
      screen: MainPage(About, 'About')
    },
    // NewFeed: { 
    //   screen: MainPage(FeedEdit, 'Create new feed')
    // },
  }, {
    initialRouteName: 'Home',
    contentComponent: Drawer,
    navigationOptions: {
      header: null
    }
  }
);

export const AppNavigator = new StackNavigator(
  {
    // SplashScreen: { screen: SplashScreen },
    Register: { 
      screen: Register,
      navigationOptions: ({ navigation }) => ({
        title: 'Register',
        headerLeft: null,
        headerRight: (
          <HeaderLink title="Sign In" onPress={() => navigation.navigate('Login') }/>
        )
      })
    },
    Login: { 
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        title: 'Login',
        headerLeft: null,
        headerRight: (
          <HeaderLink title="Sign Up" onPress={() => navigation.navigate('Register') }/>
        )
      })
    },
    Main: { 
      screen: MainNavigator,
      navigationOptions: {
        header: null
      }
    },
    Loading: { 
      screen: Loading,
      navigationOptions: {
        header: null
      }
    },
  }, {
    headerMode: 'screen',
    initialRouteName: 'Loading',
    navigationOptions: {
      headerStyle: headerStyles.header,
      headerTitleStyle: headerStyles.title,
      headerTintColor: 'white'
    },
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
    setupStyles();
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