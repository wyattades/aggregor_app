import { ToastAndroid, Platform } from 'react-native';

// TODO: create physical popup, not ToastAndroid

let alert;

if (Platform.OS === 'web') {
  alert = msg => {
    console.log(msg);
    // window.alert(msg);
  };
} else {
  alert = msg => ToastAndroid.show(msg, ToastAndroid.LONG);
}

export default alert;
