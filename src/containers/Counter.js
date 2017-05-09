import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  back: {
    margin: 10,
    fontSize: 20
  }
});

class CounterContainer extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    title: 'Counter'
  }

  render() {
    return (
      <View style={styles.container}>
        <Counter {...this.props} />
      </View>
    );
  }
}

export default connect(
  state => ({
    counter: state.counter
  }),
  dispatch => bindActionCreators(CounterActions, dispatch)
)(CounterContainer);
 