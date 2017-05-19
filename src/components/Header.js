import React, { PropTypes } from 'react';
import { Text, TouchableNativeFeedback, StyleSheet, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../utils/theme';

export const styles = StyleSheet.create({
  headerLink: {
    marginRight: 10,
    
  },
  headerLinkText: {
    color: theme.PRIMARY,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: theme.PRIMARY_DARK,
  },
  title: {
    color: theme.WHITE
  },
  icon: {
    marginHorizontal: 10,
    color: theme.WHITE,
  },
});

/*const HeaderLink = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.headerLink}>
    <Text style={styles.headerLinkText}>{title}</Text>
  </TouchableOpacity>
);*/

// TODO: button or link style?
const HeaderLink = ({ onPress, title }) => (
  <View style={styles.headerLink}>
    <Button onPress={onPress} color={theme.ACCENT} title={title}/>
  </View>
);

HeaderLink.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const ripple = TouchableNativeFeedback.SelectableBackgroundBorderless();

const HeaderButton = ({ onPress, icon }) => (
  <TouchableNativeFeedback background={ripple} onPress={onPress}>
    <View>
      <Icon name={icon} style={styles.icon} size={32}/>
    </View>
  </TouchableNativeFeedback>
);

HeaderButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export { HeaderLink, HeaderButton };