if (__DEV__) {
  console.ignoredYellowBox = [
    'Warning: BackAndroid is deprecated.',
  ];
}

import React, { Component } from 'react';
import { AppRegistry, NativeModules, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-native-material-ui';

import { PromptView } from './utils/prompt';
import Navigator from './navigator';
import configureStore from './configureStore';
import { uiTheme } from './utils/theme';

const store = configureStore();

const UIManager = NativeModules.UIManager;

class Aggregor extends Component {

  componentWillMount() {
    StatusBar.setTranslucent(true);
    
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}>
          <View style={{ flex: 1 }}>
            <Navigator/>
            <PromptView/>
          </View>
        </ThemeProvider>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Aggregor', () => Aggregor);