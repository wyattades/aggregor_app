/* eslint global-require: 0 */
import Immutable from 'immutable';
import { Platform, AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducer from './reducers';
import * as actionCreators from './actions/counter';

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
  applyMiddleware(thunk),
  autoRehydrate()
);

export default (initialState) => {
  const store = createStore(reducer, initialState, enhancer);
  
  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      try {
        // eslint-disable-next-line import/newline-after-import
        const reducers = require('./reducers').default;
        store.replaceReducer(reducers(store.asyncReducers));
      } catch (error) {
        console.error(`Reducer hot reloading error ${error}`);
      }
    });
  }

  // Persist user state
  // persistStore(store, {
  //   whitelist: [ 'user' ],
  //   storage: AsyncStorage
  // });

  return store;
};