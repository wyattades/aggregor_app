import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Platform, AsyncStorage } from 'react-native';

import reducer from './reducers';
import middleware from './middleware';
import * as actionCreators from './actions';

let composeEnhancers = compose;
if (__DEV__) {
  console.log('Starting devtools...');

  const installDevTools = require('immutable-devtools');

  installDevTools(Immutable);
  // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
  composeEnhancers = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    require('remote-redux-devtools').composeWithDevTools
  )({
    name: Platform.OS,
    ...require('../package.json').remotedev,
    actionCreators,
  });
}

const enhancer = composeEnhancers(
  applyMiddleware(thunk, ...middleware),
  autoRehydrate()
);

const configureStore = (initialState = {}) => {
  
  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      try {
        // eslint-disable-next-line import/newline-after-import
        const reducers = require('./reducers').default;
        store.replaceReducer(reducers);
      } catch (error) {
        console.error(`Reducer hot reloading error: ${error}`);
      }
    });
  }

  const store = createStore(reducer, initialState, enhancer);
  
  // Persist user state
  persistStore(store, {
    whitelist: [ 'user' ],
    storage: AsyncStorage
  });

  return store;
};

export default configureStore;