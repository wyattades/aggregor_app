import React, { Component } from 'react';
import { UIManager, View, StatusBar, Platform, StyleSheet, BackHandler } from 'react-native';
import { Provider } from 'react-redux';
import { Router } from 'react-router-native';
import createHistory from 'history/createMemoryHistory';
import { PersistGate } from 'redux-persist/integration/react';
import { hot } from 'react-hot-loader';

import { PromptView } from './utils/prompt';
import { AlertView } from './utils/alert';
import configureStore from './configureStore';
import Routes from './Routes';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
});

export const history = createHistory();

const { store: _store, persistor } = configureStore();
export const store = _store;

class App extends Component {

  componentWillMount() {
    if (Platform.OS !== 'web') {
      // Set android status bar to translucent grey
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0,0,0,0.3)');

      if (UIManager.setLayoutAnimationEnabledExperimental) {
        console.log('Enabling layout animation experimental');
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }

      BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS !== 'web') {
      BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
    }
  }

  _handleBackPress = () => {
    if (history.index > 0) {
      history.goBack();
      return true;
    }
    return false;
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <Router history={history}>
              <Routes/>
            </Router>
            <PromptView/>
            <AlertView/>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default hot(module)(App);
