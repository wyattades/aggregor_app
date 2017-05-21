import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import Navigator from './navigator';
import configureStore from './configureStore';

if (__DEV__) {
  console.ignoredYellowBox = [
    'Warning: BackAndroid is deprecated.',
  ];
}

const store = configureStore();

const Aggregor = () => (
  <Provider store={store}>
    <Navigator/>
  </Provider>
);

AppRegistry.registerComponent('Aggregor', () => Aggregor);