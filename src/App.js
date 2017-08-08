import React, { Component } from 'react';
import { NativeModules, View, StatusBar, BackHandler, Platform, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

const _Temp = ({ children }) => <View children={children}/>;
const ThemeProvider = Platform.OS === 'web' ? _Temp : require('react-native-material-ui').ThemeProvider; 

import { PromptView } from './utils/prompt';
import Navigator from './navigator';
import configureStore from './configureStore';
import { uiTheme } from './utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

const store = configureStore();

class App extends Component {

  componentWillMount() {
    if (Platform.OS !== 'web') {

      // Set android status bar to translucent grey
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0,0,0,0.3)');
      
      if (NativeModules.UIManager.setLayoutAnimationEnabledExperimental) {
        NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}> 
          <View style={styles.container}>
            <Navigator backHandler={BackHandler}/> 
            <PromptView/> 
          </View>
        </ThemeProvider> 
      </Provider>
    );
  }
}

export default App;

