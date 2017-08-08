import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Touchable from './Touchable';
import theme from '../utils/theme';

let ActionButton;

if (Platform.OS === 'web') {

  const BUTTON_SIZE = 70,
        ICON_SIZE = 32;

  const styles = StyleSheet.create({
    container: {
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      borderRadius: '50%',
      position: 'absolute',
      bottom: 40,
      right: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // equivalent to: boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
  });

  ActionButton = ({ style: { container }, onPress }) => (
    <Touchable onPress={onPress} style={[ container, styles.container ]}>
      <Icon name="add" color={theme.WHITE} size={ICON_SIZE}/>
    </Touchable>
  );

} else {
  // eslint-disable-next-line global-require
  ActionButton = require('react-native-material-ui').ActionButton;
}

export default ActionButton;
