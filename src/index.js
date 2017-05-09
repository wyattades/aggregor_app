import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import App from './navigator';
import configureStore from './configureStore';

const store = configureStore();

const Aggregor = () => (
  <Provider store={store}>
    <App/>
  </Provider>
);

AppRegistry.registerComponent('Aggregor', () => Aggregor);