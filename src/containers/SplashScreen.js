import React from 'react';
import { View, Text } from 'react-native';
import { reduxForm } from 'redux-form';

import { HeaderLink } from '../components/Header';

// TODO???

const SplashScreen = () => (
  <View>
    <Text>SplashScreen!!!</Text>
  </View>
);

SplashScreen.navigationOptions = ({ navigation }) => ({
  title: 'Splash',
  headerRight: (
    <HeaderLink title="Sign In" onPress={() => navigation.navigate('Register') }/>
  )
});

export default SplashScreen;