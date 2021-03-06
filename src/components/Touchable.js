import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, View, Platform, StyleSheet } from 'react-native';

const extractMargins = ({ marginTop, marginLeft, marginRight, marginBottom, margin, ...otherStyles }) => [
  { marginTop, marginLeft, marginRight, marginBottom, margin },
  { ...otherStyles },
];

const WebTouchable = ({ onPress, feedback, style = {}, ...rest }) => {

  const flattenedStyle = StyleSheet.flatten(style);
  
  const [ outerStyles, innerStyles ] = extractMargins(flattenedStyle);
  
  return (
    <View style={outerStyles}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        focusedOpacity={0.8}>
        <View style={innerStyles} {...rest}/>
      </TouchableOpacity>
    </View>
  );
};

const IosTouchable = ({ feedback, onPress, title, ...rest }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    focusedOpacity={0.8}>
    <View {...rest}/>
  </TouchableOpacity>
);

const getBackground = (type = 'contained') => {
  if (type === 'uncontained') {
    // return TouchableNativeFeedback.Ripple('#AAF', true);
    return TouchableNativeFeedback.SelectableBackgroundBorderless();
  } else if (type === 'none') {
    return undefined;
  } else { // 'contained' (default)
    return TouchableNativeFeedback.SelectableBackground();
  }
};

const AndroidTouchable = ({ feedback, onPress, title, ...rest }) => (
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
