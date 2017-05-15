import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

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

class Dashboard extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    title: 'Home'
  };

  toCounter = () => {
    this.props.navigation.navigate('Counter');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hello World!
        </Text>
        <Button title="Go to Counter" onPress={this.toCounter}/>
        {/*<TouchableOpacity onPress={this.toLogin}>
          <Text style={styles.instructions}>Navigate to Login</Text>
        </TouchableOpacity>*/}
      </View>
    );
  }
}

export default connect()(Dashboard);