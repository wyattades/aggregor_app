import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Button } from 'react-native';

import theme from '../styles/theme';

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
  }
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

export { HeaderLink };