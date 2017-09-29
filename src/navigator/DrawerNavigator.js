import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { addNavigationHelpers, createNavigator, TabRouter, createNavigationContainer,
  DrawerNavigator as NativeDrawerNavigator } from 'react-navigation';
// import WebDrawerNavigator from 'react-navigation/lib/navigators/DrawerNavigator';
import withCachedChildNavigation from 'react-navigation/lib/withCachedChildNavigation';

let DrawerNavigator;

if (Platform.OS === 'web') {

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1,
    },
    drawerContainer: {
      // equivalent to: boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)' (for iOS and webe)
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      // android
      elevation: 5,
    },
  });

  const DefaultDrawerConfig = {
    drawerWidth: 300,
    contentComponent: null,
    drawerPosition: 'left',
  };

  const DrawerView = withCachedChildNavigation(class extends React.Component {

    state = {
      drawerOpen: false,
    }

    _toggleDrawer = () => this.setState({
      drawerOpen: !this.state.drawerOpen,
    });

    render() {

      const {
        navigation,
        childNavigationProps,
        router,
        screenProps = {},
        // contentComponent: Drawer,
        // drawerWidth,
      } = this.props;
      
      const { routes, index } = navigation.state;
      const childNavigation = childNavigationProps[routes[index].key];
      const Content = router.getComponentForRouteName(routes[index].routeName);

      return <Content navigation={childNavigation} screenProps={screenProps}/>;

      // // TODO: hackish way to check toggle
      // const oldNavigate = childNavigation.navigate;
      // childNavigation.navigate = (routeName, params, action) => {
      //   if (routeName === 'DrawerToggle') {
      //     this._toggleDrawer();
      //   }
      //   oldNavigate(routeName, params, action);
      // };
        
      // return (
      //   <View style={{ flex: 1 }}>
      //     <View style={styles.container}>
      //       { this.state.drawerOpen ? (
      //         <View style={[styles.drawerContainer, { width: drawerWidth }]}>
      //           <Drawer navigation={navigation}/>
      //         </View>
      //       ) : null}
      //       <Content navigation={childNavigation} screenProps={screenProps}/>
      //     </View>
      //   </View>
      // );
    }
  });

  DrawerNavigator = (routeConfigs, config) => {
    const mergedConfig = { ...DefaultDrawerConfig, ...config };
    const {
      containerConfig,
      drawerWidth,
      contentComponent,
      contentOptions,
      drawerPosition,
      ...tabsConfig
    } = mergedConfig;

    const contentRouter = TabRouter(routeConfigs, tabsConfig);

    const navigator = createNavigator(
      contentRouter,
      routeConfigs,
      config,
      'react-navigation/TABS',
    )((props) => (
      <DrawerView
        {...props}
        drawerWidth={drawerWidth}
        contentComponent={contentComponent}
        // contentOptions={contentOptions}
        // drawerPosition={drawerPosition}
      />
    ));

    return createNavigationContainer(navigator);
  };

} else {
  DrawerNavigator = NativeDrawerNavigator;
}

export default DrawerNavigator;
