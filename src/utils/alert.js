import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Animated } from 'react-native';
import { connect } from 'react-redux';

import { store } from '../App';
import theme from './theme';

const HEIGHT = 60,
      DEFAULT_TIMEOUT = 6000;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
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

class AlertView extends Component {

  constructor(props) {
    super(props);

    this._fade = new Animated.Value(props.options.visible ? 1 : 0);
    this._last_message = props.options.msg || '';
    this._setTimeout(props.options);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options.visible !== this.props.options.visible) {
      this._animate(nextProps.options.visible);

      this._last_message = nextProps.options.msg || this._last_message;

      this._setTimeout(nextProps.options);
    }
  }

  _setTimeout = options => {
    if (options.visible) {
      setTimeout(
        () => this.props.dispatch({ type: 'UNSET_ALERT' }),
        options.timeout || DEFAULT_TIMEOUT,
      );
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
    const style = {
      height: this._fade.interpolate({
        inputRange: [0, 1],
        outputRange: [0, HEIGHT],
      }),
      opacity: this._fade.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[ styles.alert, style ]}>
          <Text style={styles.text}>{this._last_message}</Text>
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
