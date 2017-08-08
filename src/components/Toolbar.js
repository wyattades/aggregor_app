import React from 'react';
import { View, Text, Platform, StatusBar, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Touchable from './Touchable';
import theme from '../utils/theme';

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
    backgroundColor: theme.PRIMARY_DARK,
  },

  container: {
    height: 60,
    backgroundColor: theme.PRIMARY_DARK,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // equivalent to: boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

let Toolbar;

if (Platform.OS === 'web') {

  const createIcon = name => (
    <Icon name={name} color={theme.WHITE} size={32}/>
  );

  const iconFactory = (element, onPress) => {
    if (typeof element === 'string') {
      element = createIcon(element);
    } else if (typeof element === 'object') {
      const menu = element.menu ? createIcon(element.menu.icon) : null;
      element = menu;
    } else if (!React.isValidElement(element)) {
      return <View/>;
    }

    return (
      <Touchable onPress={onPress}>
        {element}
      </Touchable>
    );
  };

  const textFactory = element => {

    if (React.isValidElement(element)) {
      return element;
    } else {
      return <Text/>;
    }
  };

  const _Toolbar = () => {

    let {
      leftElement,
      onLeftElementPress,
      centerElement,
      rightElement,
      onRightElementPress,
    } = this.props;

    leftElement = iconFactory(leftElement, onLeftElementPress);
    centerElement = textFactory(centerElement);
    rightElement = iconFactory(rightElement, onRightElementPress);

    return (
      <View style={styles.container}>
        {leftElement}
        {centerElement}
        {rightElement}
      </View>
    );
  };

  Toolbar = _Toolbar;

} else {

  // eslint-disable-next-line global-require
  const _Toolbar = require('react-native-material-ui').Toolbar;

  // We need space for the statusBar to sit above the Toolbar
  Toolbar = props => (
    <View>
      <View style={styles.statusBar}/>
      <_Toolbar {...props}/>
    </View>
  );

}

export default Toolbar;
