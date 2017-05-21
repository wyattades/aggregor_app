import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import React, { Component, PropTypes } from 'react';
import { BackHandler } from 'react-native';

import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import Register from './containers/Register';
import FeedEdit from './containers/FeedEdit';
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
      navigationOptions: ({ navigation, screenProps: { selectedFeed, parentNavigation } }) => ({
        title: 'Home' + (selectedFeed ? `: ${selectedFeed}` : ''),
        headerLeft: <HeaderButton icon="menu" onPress={()=>parentNavigation.navigate('DrawerOpen')}/>,
        headerRight: <HeaderButton icon="edit" onPress={()=>navigation.navigate('FeedEdit')}/>
      })
    },
    FeedEdit: {
      screen: FeedEdit,
      navigationOptions: ({ navigation, screenProps: { selectedFeed } }) => ({
        title: 'Edit: ' + selectedFeed
      })
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

const HomeNavigatorWrapper = connect(({ selectedFeed }) => ({ 
  selectedFeed
}))(({ selectedFeed, navigation }) => (
  <HomeNavigator screenProps={{ selectedFeed, parentNavigation: navigation }}/>
));

const MainNavigator = new DrawerNavigator(
  {
    Home: { screen: HomeNavigatorWrapper },
    Account: { 
      screen: MainPage(Account, 'Account')
    },
    About: { 
      screen: MainPage(About, 'About')
    },
    NewFeed: { 
      screen: MainPage(FeedEdit, 'Create new feed')
    },
  }, {
    initialRouteName: 'Home',
    // drawerWidth: 250,
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
    const { nav, dispatch } = this.props;
    if (nav.routes.length > 1) {
      dispatch(NavigationActions.back());
      return true; // do not exit app
    } else {
      return false; // exit app
    }
  }

  componentWillMount() {
    setupStyles();
    // BackHandler.addEventListener('hardwareBackPress', this._handleBack);
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this._handleBack);
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