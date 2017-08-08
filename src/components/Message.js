import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
    margin: 16,
    marginHorizontal: 40,
    textAlign: 'center',
  },
  messageView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export const Message = ({ text }) => (
  <Text style={styles.message}>{text}</Text>
);

export const MessageView = ({ children }) => (
  <View style={styles.messageView}>{children}</View>
);
