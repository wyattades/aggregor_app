import React from 'react';
import { View, Platform } from 'react-native';
import { addNavigationHelpers, createNavigator, StackRouter, createNavigationContainer,
  StackNavigator as NativeStackNavigator } from 'react-navigation';

import WebStackNavigator from 'react-navigation/lib/navigators/StackNavigator';

let StackNavigator;

if (Platform.OS === 'web') {

  // const NavView = ({ navigation, router, screenProps = {} }) => {

  //   const { state } = navigation;

  //   const _Component = router.getComponentForState(state);
    
  //   const _navigation = addNavigationHelpers({
  //     ...navigation,
  //     state: state.routes[state.index],
  //   });

  //   const screenOptions = router.getScreenOptions(_navigation, screenProps);

  //   // IDK where to get scene.route.params except like this
  //   const scene = { route: router.getPathAndParamsForState(state) };
    
  //   const Header = screenOptions.header;

  //   return (
  //     <View style={{ flex: 1 }}>
  //       {Header ? <Header navigation={navigation} scene={scene}/> : null}
  //       <_Component
  //         navigation={_navigation}
  //       />
  //     </View>
  //   );
  // };

  // StackNavigator = (routeConfigMap, stackConfig = {}) => {
  //   const {
  //     initialRouteName,
  //     initialRouteParams,
  //     paths,
  //     headerMode,
  //     mode,
  //     cardStyle,
  //     transitionConfig,
  //     onTransitionStart,
  //     onTransitionEnd,
  //     navigationOptions,
  //   } = stackConfig;

  //   const stackRouterConfig = {
  //     initialRouteName,
  //     initialRouteParams,
  //     paths,
  //     navigationOptions,
  //   };

  //   const router = StackRouter(routeConfigMap, stackRouterConfig);

  //   // Create a navigator with NavView as the view
  //   const navigator = createNavigator(
  //     router,
  //     routeConfigMap,
  //     stackConfig,
  //   )(props => 
  //     <NavView
  //       {...props}
  //       headerMode={headerMode}
  //       mode={mode}
  //       cardStyle={cardStyle}
  //       transitionConfig={transitionConfig}
  //       onTransitionStart={onTransitionStart}
  //       onTransitionEnd={onTransitionEnd}/>
  //   );

  //   return createNavigationContainer(navigator);
  // };
  StackNavigator = WebStackNavigator;

} else {
  StackNavigator = NativeStackNavigator;
}

export default StackNavigator;
