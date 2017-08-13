import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import { AppContainer } from 'react-hot-loader';

import App from './App';

if (__DEV__) {
  // Some of these are fixed when migrating to React 16
  console.ignoreYellowBox = ['Warning: BackAndroid is deprecated', 'Warning: Accessing createClass'];

  // Suppress some errors:
  const errs = [
    'Warning: Unknown prop `endFillColor` on <div>',
    'Warning: Unknown prop `accessibilityViewIsModal` on <div>',
  ];
  for (const type of ['error']) {
    const native = `native_${type}`;
    console[native] = console[type];
    console[type] = (...args) => {
      if (args.length > 0) {
        const str = `${args[0]}`;
        for (const ig of errs) {
          if (str.startsWith(ig)) {
            return;
          }
        }
      }
      console[native](...args);
    };
  }
}

if (Platform.OS === 'web') {
  const render = (name, RootComponent) => {
    AppRegistry.registerComponent(name, () => () => (
      <AppContainer>
        <RootComponent />
      </AppContainer>
    ));

    AppRegistry.runApplication(name, { rootTag: document.getElementById('react-root') });
  };

  render('Aggregor', App);

  // Enable hot reloading
  if (module.hot) {
    module.hot.accept('./App', () => {
      // eslint-disable-next-line global-require
      const NextRootContainer = require('./App').default;
      render('NextApp', NextRootContainer);
    });
  }
} else {
  AppRegistry.registerComponent('Aggregor', () => App);
}
