import { AppRegistry, Platform } from 'react-native';

import App from './App';

AppRegistry.registerComponent('Aggregor', () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('Aggregor', { rootTag: document.getElementById('react-root') });
}
