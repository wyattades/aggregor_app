import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import theme from '../utils/theme';
import Container from '../components/Container';
import headerWrapper from '../components/HeaderWrapper';

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
  text: {
    color: theme.TEXT,
    fontSize: 18,
    marginHorizontal: 16,
    marginTop: 6,
  },
});

const About = ({ plugin_array }) => (
  <Container style={styles.container} adjust={600}>
    <View>
      <View style={styles.textGroup}>
        <Text style={styles.title}>The Idea:</Text>
        <Text style={styles.text}>A method for viewing all of your news and social media feeds in one place.</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.title}>Supported Sources*:</Text>
        {plugin_array.map(plugin =>
          <Text style={styles.text} key={plugin.type}>• {plugin.label}</Text>,
        )}
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.title}>Created By:</Text>
        <Text style={styles.text}>• Wyatt Ades</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.title}>With help from:</Text>
        <Text style={styles.text}>• Lee White (UI)</Text>
        <Text style={styles.text}>• Spenser Williams (backend)</Text>
      </View>
    </View>
    <Text style={styles.noteText}>
      *Aggregor is a proof of concept app and may or may not support more sources in the future
    </Text>
  </Container>
);

export default headerWrapper(connect(state => ({
  plugin_array: state.plugin_array,
}))(About), 'About');
