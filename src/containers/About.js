import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import theme from '../utils/theme';

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  noteText: {
    color: theme.TEXT_SECOND,
    padding: 16,
  },
  textGroup: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: theme.ACCENT,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  text:{
    color: theme.TEXT,
    fontSize: 18,
    marginHorizontal: 16,
    marginTop: 6,
  }
});

const About = () => (
  <View style={styles.container}>
    <View>
      <View style={styles.textGroup}>
        <Text style={styles.title}>The Idea:</Text>
        <Text style={styles.text}>A method for viewing all of your news/social media feeds in one place.</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.title}>Supported News Sources*:</Text>
        <Text style={styles.text}>• Hacker News</Text>
        <Text style={styles.text}>• Reddit</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.title}>Created By:</Text>
        <Text style={styles.text}>UI and Backend: Wyatt Ades</Text>
        <Text style={styles.text}>UI: Lee White</Text>
      </View>
    </View>
    <Text style={styles.noteText}>*Aggregor is a proof of concept app and may or may not support more sources in the future</Text>
  </View>
);

export default connect()(About);