import React from 'react';
import { View, Text, StatusBar, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Touchable from './Touchable';
import theme from '../utils/theme';

const [ HEIGHT, ICON_SIZE ] = Platform.OS === 'web' ?
  [ 60, 32 ] :
  [ 56, 24 ];

const styles = StyleSheet.create({
  
  statusBar: {
    height: StatusBar.currentHeight,
    backgroundColor: theme.PRIMARY_DARK,
  },

  container: {
    height: HEIGHT,
    backgroundColor: theme.PRIMARY_DARK,
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

  title: {
    color: theme.WHITE,
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 20,
  },

  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconArray: {
    flexDirection: 'row',
    width: 24 + 16 + 24,
  },
});

const TouchIcon = ({ name, onPress, style }) => (
  <Touchable onPress={onPress} feedback="uncontained" style={style || {}}>
    <Icon name={name} color={theme.WHITE} size={ICON_SIZE}/>
  </Touchable>
);

const iconFactory = (element, onPress, flex) => {
  if (typeof element === 'string') {
    element = (
      <TouchIcon name={element} onPress={onPress}/>
    );
  } else if (Array.isArray(element)) {
    element = element.map((icon, index) => (
      <TouchIcon
        key={index}
        style={index > 0 && styles.iconMargin}
        name={icon}
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
}) => {

  leftElement = iconFactory(leftElement, onLeftElementPress, 'start');
  centerElement = textFactory(centerElement);
  rightElement = iconFactory(rightElement, onRightElementPress, 'end');

  return (
    <View>
      { Platform.OS !== 'web' ? <View style={styles.statusBar}/> : null }
      <View style={styles.container}>
        {leftElement}
        <View style={styles.titleView}>
          { Platform.OS === 'web' ? <Text style={styles.title}>Aggregor</Text> : null }
          {centerElement}
        </View>
        {rightElement}
      </View>
    </View>
  );
};

export default Toolbar;
