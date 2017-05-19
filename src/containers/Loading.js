import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import theme from '../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.PRIMARY_DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: theme.WHITE,
  }
});

const Loading = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Aggregor</Text>
  </View>
);

export default Loading;