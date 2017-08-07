import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, View, Platform } from 'react-native';

const WebTouchable = ({ onPress, feedback, ...rest }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    focusedOpacity={0.8}>
    <View {...rest}/>
  </TouchableOpacity>
);

const IosTouchable = WebTouchable;

const getBackground = (type = 'contained') => {
  if (type === 'uncontained') {
    return TouchableNativeFeedback.SelectableBackground();
  } else if (type === 'none') {
    return undefined;
  } else { // 'contained'
    return TouchableNativeFeedback.SelectableBackground();
  }
};

const AndroidTouchable = ({ feedback, onPress, ...rest }) => (
  <TouchableNativeFeedback 
    background={getBackground(feedback)}
    onPress={onPress}>
    <View {...rest}/>
  </TouchableNativeFeedback>  
);

export default Platform.select({
  web: WebTouchable,
  android: AndroidTouchable,
  ios: IosTouchable,
});