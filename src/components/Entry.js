import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

const Entry = ({ id, title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

export default Entry;