import React from 'react';
import { View, Platform } from 'react-native';
import { addNavigationHelpers, createNavigator, TabRouter, createNavigationContainer,
  DrawerNavigator as NativeDrawerNavigator } from 'react-navigation';
import WebDrawerNavigator from 'react-navigation/lib/navigators/DrawerNavigator';

let DrawerNavigator;

if (Platform.OS === 'web') {

  const NavView = ({ navigation, router, screenProps = {} }) => {

    const { state } = navigation;

    const _Component = router.getComponentForState(state);
    
    const _navigation = addNavigationHelpers({
      ...navigation,
      state: state.routes[state.index],
    });

    const screenOptions = router.getScreenOptions(_navigation, screenProps);

    // IDK where to get scene.route.params except like this
    const scene = { route: router.getPathAndParamsForState(state) };
    
    const Header = screenOptions.header;

    return (
      <View style={{ flex: 1 }}>
        {Header ? <Header navigation={navigation} scene={scene}/> : null}
        <_Component
          navigation={_navigation}
        />
      </View>
    );
  };

  const DefaultDrawerConfig = {
    drawerWidth: 360,
    contentComponent: null,
    drawerPosition: 'left',
  };

  // DrawerNavigator = (routeConfigs, config) => {
  //   const mergedConfig = { ...DefaultDrawerConfig, ...config };
  //   const {
  //     containerConfig,
  //     drawerWidth,
  //     contentComponent,
  //     contentOptions,
  //     drawerPosition,
  //     ...tabsConfig
  //   } = mergedConfig;

  //   const contentRouter = TabRouter(routeConfigs, tabsConfig);

  //   const drawerRouter = TabRouter(
  //     {
  //       DrawerClose: {
  //         screen: createNavigator(
  //           contentRouter,
  //           routeConfigs,
  //           config,
  //         )((props) => <DrawerScreen {...props} />),
  //       },
  //       DrawerOpen: {
  //         screen: () => null,
  //       },
  //     },
  //     {
  //       initialRouteName: 'DrawerClose',
  //     }
  //   );

  //   const navigator = createNavigator(
  //     drawerRouter,
  //     routeConfigs,
  //     config,
  //   )((props) =>
  //     <DrawerView
  //       {...props}
  //       drawerWidth={drawerWidth}
  //       contentComponent={contentComponent}
  //       contentOptions={contentOptions}
  //       drawerPosition={drawerPosition}
  //     />
  //   );

  //   return createNavigationContainer(navigator);
  // };

  DrawerNavigator = WebDrawerNavigator;

} else {
  DrawerNavigator = NativeDrawerNavigator;
}

export default DrawerNavigator;
