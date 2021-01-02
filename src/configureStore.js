import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';
import { AsyncStorage } from 'react-native';

import reducers from './reducers';
import * as actionCreators from './actions';
import { history } from './App';

let composeEnhancers = compose;

if (__DEV__ && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  console.log('Starting redux devtools...');

  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('immutable-devtools')(require('immutable'));

  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionCreators,
  });
}

const configureStore = (initialState = {}) => {

  const enhancer = composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)));

  const persistedReducer = persistReducer({
    key: 'root',
    whitelist: [ 'user' ],
    storage: AsyncStorage,
  }, reducers);

  const store = createStore(persistedReducer, initialState, enhancer);

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      // eslint-disable-next-line global-require
      const _reducers = require('./reducers/index');
      store.replaceReducer(_reducers);
    });
  }

  // Persist user state
  const persistor = persistStore(store, null, () => {
    console.log('Rehydration complete');
  });

  return { store, persistor };
};

export default configureStore;
