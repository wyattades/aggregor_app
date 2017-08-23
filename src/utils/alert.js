import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Animated } from 'react-native';
import { connect } from 'react-redux';

import { store } from '../App';
import theme from './theme';

const HEIGHT = 40;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: HEIGHT,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  alert: {
    backgroundColor: theme.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    overflow: 'hidden',
    paddingHorizontal: 16,
  },
  text: {
    color: theme.WHITE,
    fontWeight: Platform.OS === 'web' ? 'bold' : '500',
  },
});

/* eslint-disable react/prefer-stateless-function */
class AlertView extends Component {

  constructor(props) {
    super(props);

    this._fade = new Animated.Value(props.options.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options.visible !== this.props.options.visible) {
      this._animate(nextProps.options.visible);
    }
  }

  _animate = visible => Animated.timing(
    this._fade,
    {
      toValue: visible ? 1 : 0,
      duration: 400,
    },
  ).start();

  render() {
    const { options: { msg } } = this.props;

    const style = {
      height: this._fade.interpolate({
        inputRange: [0, 1],
        outputRange: [0, HEIGHT],
      }),
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[ styles.alert, style ]}>
          <Text style={styles.text}>{msg}</Text>
        </Animated.View>
      </View>
    );
  }
}

AlertView = connect(({ alert: options }) => ({
  options,
}))(AlertView);

export { AlertView };

export default (msg, timeout) => store.dispatch({
  type: 'SET_ALERT',
  msg,
  timeout,
});
