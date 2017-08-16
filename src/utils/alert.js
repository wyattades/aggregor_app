import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Animated } from 'react-native';
import { connect } from 'react-redux';

import { store } from '../App';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: theme.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  text: {
    color: theme.WHITE,
    fontWeight: Platform.OS === 'web' ? 'bold' : '500',
  },
});

/* eslint-disable react/prefer-stateless-function */
class AlertView extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     fade: new Animated.Value(props.options.visible ? 1 : 0),
  //   };
  // }

  // componentDidMount() {
  //   this._animate(this.props.options.visible);
  // }

  // componentWillReceiveProps(nextProps) {
  //   this._animate(nextProps.options.visible);
  // }

  // _animate = visible => Animated.timing(
  //   this.state.fade,
  //   {
  //     toValue: visible ? 1 : 0,
  //     duration: 600,
  //   },
  // );

  render() {
    const { dispatch, options: { msg, visible } } = this.props;

    // const style = {
    //   opacity: this.state.fade.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, 1],
    //   }),
    // };

    return !visible ? null : (
      <Animated.View style={[ styles.container ]}>
        <Text style={styles.text}>{msg}</Text>
      </Animated.View>
    );
  }
}

AlertView = connect(state => ({
  options: state.alert,
}))(AlertView);

export { AlertView };

export default (msg, timeout) => store.dispatch({
  type: 'SET_ALERT',
  msg,
  timeout,
});
