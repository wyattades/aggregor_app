if (__DEV__) {
  console.ignoredYellowBox = [
    'Warning: BackAndroid is deprecated.',
  ];
}

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import Navigator from './navigator';
import configureStore from './configureStore';

const store = configureStore();

const Aggregor = () => (
  <Provider store={store}>
    <Navigator/>
  </Provider>
);

AppRegistry.registerComponent('Aggregor', () => Aggregor);