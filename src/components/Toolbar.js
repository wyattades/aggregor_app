import React from 'react';
import { View, Text, StatusBar, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Touchable from './Touchable';
import theme from '../utils/theme';

const HEIGHT = 56,
      ICON_SIZE = 24;

const styles = StyleSheet.create({
  
  statusBar: {
    height: StatusBar.currentHeight,
    backgroundColor: theme.PRIMARY_DARK,
  },

  container: {
    height: HEIGHT,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // equivalent to: boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  iconMargin: {
    marginLeft: 16,
  },
  iconArray: {
    flexDirection: 'row',
    width: 24 + 16 + 24,
  },
});

const TouchIcon = ({ name, onPress, style, color }) => (
  <Touchable onPress={onPress} feedback="uncontained" style={style || {}}>
    <Icon name={name} color={color} size={ICON_SIZE}/>
  </Touchable>
);

const iconFactory = (element, onPress, color, flex) => {
  if (typeof element === 'string') {
    element = (
      <TouchIcon name={element} onPress={onPress} color={color}/>
    );
  } else if (Array.isArray(element)) {
    element = element.map((icon, index) => (
      <TouchIcon
        key={index}
        style={index > 0 && styles.iconMargin}
        name={icon}
        color={color}
        onPress={() => onPress({ index, icon })}/>
    ));
  } else if (!React.isValidElement(element)) {
    element = null;
  }

  return (
    <View style={[ styles.iconArray, { justifyContent: `flex-${flex}` }]}>
      {element}
    </View>
  );
};

const textFactory = element => {

  if (React.isValidElement(element)) {
    return element;
  } else {
    return <Text/>;
  }
};

const Toolbar = ({
  leftElement,
  onLeftElementPress,
  centerElement,
  rightElement,
  onRightElementPress,
  contentColor = theme.WHITE,
  backgroundColor = theme.PRIMARY_DARK,
}) => {

  leftElement = iconFactory(leftElement, onLeftElementPress, contentColor, 'start');
  centerElement = textFactory(centerElement, contentColor);
  rightElement = iconFactory(rightElement, onRightElementPress, contentColor, 'end');

  return (
    <View style={{ zIndex: 2 }}>
      { Platform.OS !== 'web' ? <View style={styles.statusBar}/> : null }
      <View style={[styles.container, { backgroundColor }]}>
        {leftElement}
        {centerElement}
        {rightElement}
      </View>
    </View>
  );
};

export default Toolbar;
