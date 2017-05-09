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

class Home extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool
  };

  static navigationOptions = {
    title: 'Home'
  };

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
      });
      this.props.navigation.dispatch(resetAction);
      // this.props.navigation.navigate({
      //   routeName: 'Login',
      //   index: 0
      // });
    }
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
        <Button title="Go to Counter" onPress={this.toCounter}/>
        {/*<TouchableOpacity onPress={this.toLogin}>
          <Text style={styles.instructions}>Navigate to Login</Text>
        </TouchableOpacity>*/}
      </View>
    );
  }
}

export default connect(state => ({
  isLoggedIn: state.user.isLoggedIn
}))(Home);