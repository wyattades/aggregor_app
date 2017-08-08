import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import theme from '../utils/theme';

// TODO: remove loading container, just use login?

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.PRIMARY_DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: theme.WHITE,
  },
  indicator: {
    position: 'absolute',
    top: 100,
  },
});

const Loading = () => (
  <View style={styles.container}>
    <View style={styles.middle}>
      <Text style={styles.title}>Aggregor</Text>
      <ActivityIndicator color={theme.PRIMARY} size="large" style={styles.indicator}/>
    </View>
  </View>
);

export default Loading;
