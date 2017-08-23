import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Platform, AsyncStorage } from 'react-native';

import reducers from './reducers';
import middleware from './middleware';
import * as actionCreators from './actions';

let composeEnhancers = compose;
if (__DEV__) {
  console.log('Starting devtools...');

  // eslint-disable-next-line global-require
  const installDevTools = require('immutable-devtools');

  installDevTools(Immutable);
  // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
  composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    // eslint-disable-next-line global-require
    require('remote-redux-devtools').composeWithDevTools)({
    name: Platform.OS,
    // eslint-disable-next-line global-require
    ...require('../package.json').remotedev,
    actionCreators,
  });
}

const enhancer = composeEnhancers(applyMiddleware(thunk, ...middleware), autoRehydrate());

const configureStore = (initialState = {}) => {
  const store = createStore(reducers, initialState, enhancer);

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      // eslint-disable-next-line global-require
      const _reducers = require('./reducers/index').default;
      store.replaceReducer(_reducers);
    });
  }

  // Persist user state
  persistStore(store, {
    whitelist: ['user'],
    storage: AsyncStorage,
  });

  return store;
};

export default configureStore;
