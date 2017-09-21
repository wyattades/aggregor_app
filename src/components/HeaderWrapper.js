import React from 'react';
import { View } from 'react-native';

import { MainHeader } from '../components/Header';

const headerWrapper = (Content, title) => ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <MainHeader
      navigation={navigation}
      title={title}/>
    <Content/>
  </View>
);

export default headerWrapper;
