import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Touchable from './Touchable';
import theme from '../utils/theme';

const [ BUTTON_SIZE, ICON_SIZE, OFFSET ] = [ 56, 24, 20 ];

const styles = StyleSheet.create({
  container: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    // Wrap button with circle so ripple doesn't bleed out
    borderRadius: BUTTON_SIZE / 2,

    position: 'absolute',
    bottom: OFFSET,
    right: OFFSET,
    // equivalent to: boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)' (for iOS only)
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    // android
    elevation: 5,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ({ style, onPress }) => (
  <View style={styles.container}>
    <Touchable onPress={onPress} style={[ style, styles.button ]} feedback="uncontained">
      <Icon name="add" color={theme.WHITE} size={ICON_SIZE}/>
    </Touchable>
  </View>
);
