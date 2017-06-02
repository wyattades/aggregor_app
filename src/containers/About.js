import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import theme from '../utils/theme';

const styles = StyleSheet.create({ 
  mainText: {
    fontSize: 20,
    marginHorizontal: 30,
    paddingTop: 20,
    color: theme.ACCENT,
    fontWeight: 'bold'
  },
  subText:{
  	fontSize: 18,
  	marginHorizontal: 45,
  	paddingTop: 5
  }
});

const Account = () => (
  <View>
    <Text style={styles.mainText}>Supported News Sources:</Text>
    <Text style={styles.subText}>• Hacker News</Text>
    <Text style={styles.subText}>• Reddit</Text>
  </View>
);

export default connect()(Account);