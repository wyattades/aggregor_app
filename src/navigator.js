import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import React, { Component, PropTypes } from 'react';
import { Platform, BackAndroid } from 'react-native';
// import { Tabs, Tab } from 'react-native-elements';

import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import Register from './containers/Register';
import SplashScreen from './containers/SplashScreen';
import IconToggle from './components/IconToggle';
import { styles as headerStyles } from './components/Header';
import { init } from './actions/navActions';

// const Drawer = () => (
//   <View><Text>Drawer!!!</Text></View>
// );

// const navigationOptions = {
//   title: ({ state }) => state.routeName,
//   header: ({ navigate }) => ({
//     left: (
//       <IconToggle
//         onPress={() => navigate('DrawerOpen')}
//       />
//     ),
//   }),
// };

// const DrawerRoutes = {
//   Drawer: {
//     name: 'Drawer',
//     screen: StackNavigator(
//       {
//         Dashboard: {
//           screen: Object.assign(Dashboard, { navigationOptions }),
//         },
//         Logout: {
//           screen: Login,
//         },
//       },
//       {
//         initialRouteName: 'Dashboard',
//         headerMode: 'screen',
//         mode: Platform.OS === 'ios' ? 'modal' : 'card',
//       },
//     ),
//   },
// };

// const AppNavigator = StackNavigator(
//   {
//     SplashScreen: {
//       name: 'SplashScreen',
//       screen: SplashScreen,
//     },
//     Login: {
//       name: 'Login',
//       screen: Login,
//     },
//     Drawer: {
//       name: 'Drawer',
//       screen: DrawerNavigator(
//         DrawerRoutes,
//         {
//           initialRouteName: 'Dashboard',
//           drawerPosition: 'left',
//           contentComponent: Drawer,
//         },
//       ),
//     },
//   },
//   {
//     initialRouteName: 'SplashScreen',
//     headerMode: 'none',
//     header: { visible: false },
//     mode: Platform.OS === 'ios' ? 'modal' : 'card',
//   },
// );

const MainNavigator = new TabNavigator(
  {
    Dashboard: { screen: Dashboard }
  },
  {
    initialRouteName: 'Dashboard',
    
  }
);

MainNavigator.navigationOptions = {
  title: 'Aggregor'
};

export const AppNavigator = new StackNavigator(
  {
    Register: { screen: Register },
    // SplashScreen: { screen: SplashScreen },
    Login: { screen: Login },
    Main: { screen: MainNavigator },
  },
  {
    headerMode: 'screen',
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: headerStyles.header,
      headerTitleStyle: headerStyles.title,
      headerTintColor: 'white'
    },
  }
);

class AppWithNavigationState extends Component {

  handleBack = () => {
    const { nav, dispatch } = this.props;
    if (nav.routes.length > 1) {
      dispatch(NavigationActions.back());
      return true; // do not exit app
    } else {
      return false; // exit app
    }
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);

    if (this.props.isLoggedIn) {
      this.props.dispatch(init('Main'));
    }
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
    );
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

export default connect(state => ({
  nav: state.nav,
  isLoggedIn: state.user.isLoggedIn,
}))(AppWithNavigationState);