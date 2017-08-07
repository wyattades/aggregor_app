import { ToastAndroid, Platform } from 'react-native';

let alert;

if (Platform.OS === 'web') {
  alert = msg => window.alert(msg);
} else {
  alert = msg => ToastAndroid.show(msg, ToastAndroid.LONG);
}

export default alert;