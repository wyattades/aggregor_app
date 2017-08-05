if (__DEV__) {
  console.ignoredYellowBox = [
    'Warning: BackAndroid is deprecated.',
  ];
}

import React, { Component } from 'react';
import { AppRegistry, NativeModules, View, StatusBar, BackHandler, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-native-material-ui';

import { PromptView } from './utils/prompt';
import Navigator from './navigator';
import configureStore from './configureStore';
import { uiTheme } from './utils/theme';

const store = configureStore({}, AsyncStorage);

const UIManager = NativeModules.UIManager;

class Aggregor extends Component {

  componentWillMount() {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('rgba(0,0,0,0.3)');
    
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
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