if (__DEV__) {
  // Some of these are fixed when migrating to React 16
  console.ignoreYellowBox = [
    'Warning: BackAndroid is deprecated',
    'Warning: Accessing PropTypes',
    'Warning: Accessing createClass',
  ];

  const errs = [
    'Warning: Unknown prop `endFillColor` on <div>',
    'Warning: Unknown prop `accessibilityViewIsModal` on <div>',
  ];

  for (let type of ['error']) {
    const native = `native_${type}`;
    console[native] = console[type];
    console[type] = (...args) => {
      if (args.length > 0) {
        const str = `${args[0]}`;
        for (let ig of errs) {
          if (str.startsWith(ig)) {
            return;
          } 
        }
      }
      console[native](...args);
    };
  }
}

import React, { Component } from 'react';
import { AppRegistry, NativeModules, View, StatusBar, BackHandler, Platform } from 'react-native';
import { Provider } from 'react-redux';

const _Temp = ({ children }) => <View children={children}/>;
const ThemeProvider = Platform.OS === 'web' ? _Temp : require('react-native-material-ui').ThemeProvider; 

import { PromptView } from './utils/prompt';
import Navigator from './navigator';
import configureStore from './configureStore';
import { uiTheme } from './utils/theme';

const store = configureStore();

class Aggregor extends Component {

  componentWillMount() {
    if (Platform.OS !== 'web') {

      // Set android status bar to translucent grey
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0,0,0,0.3)');
      
      if (NativeModules.UIManager.setLayoutAnimationEnabledExperimental) {
        NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}> 
          <View style={{ flex: 1 }}>
            <Navigator backHandler={BackHandler}/> 
            <PromptView/> 
          </View>
        </ThemeProvider> 
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Aggregor', () => Aggregor);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('Aggregor', { rootTag: document.getElementById('react-root') });
}