import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({ 
  mainText: {
    fontSize: 20,
    marginHorizontal: 30,
    paddingTop: 20
  },
  header:{
    fontSize: 25,
    fontWeight: 'bold',
    padding: 15
  },
  subText:{
  	fontSize: 18,
  	marginHorizontal: 45,
  	paddingTop: 5
  }
});

const Account = () => (
  <View>
    <Text style={styles.header}>About Aggregor</Text>
    <Text style={styles.mainText}>Supported News Sources:</Text>
    <Text style={styles.subText}>• Hacker News</Text>
    <Text style={styles.subText}>• Reddit</Text>
  </View>
);

export default connect()(Account);