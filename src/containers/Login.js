import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

class Login extends Component {
  
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    title: 'Login'
  }

  render() {
    return (
      <View>Login Page</View>
    );
  }
}

export default Login;