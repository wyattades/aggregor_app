import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    title: 'Home'
  }

  toCounter = () => {
    this.props.navigation.navigate('Counter');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hello World!
        </Text>
        <TouchableOpacity onPress={this.toCounter}>
          <Text style={styles.instructions}>Navigate to Counter</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity onPress={this.toLogin}>
          <Text style={styles.instructions}>Navigate to Login</Text>
        </TouchableOpacity>*/}
      </View>
    );
  }
}

export default Home;