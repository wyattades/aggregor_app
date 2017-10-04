import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

class Container extends Component {

  state = {
    large: Dimensions.get('window').width > this.props.testWidth,
  }

  _onLayout = ({ nativeEvent: { layout: { width } } }) => {
    if ((width > this.props.testWidth && !this.state.large) || (width <= this.props.testWidth && this.state.large)) {
      this.setState({
        large: !this.state.large,
      });
    }
  }

  render() {

    const { adjust, children, style } = this.props;
    const _style = Array.isArray(style) ? style : [style];

    let inner;
    let spacerFlex = 0.0;

    if (this.state.large) {
      if (adjust <= 1.0) {
        inner = {
          flex: adjust,
        };
        spacerFlex = (1.0 - adjust) * 0.5;
      } else {
        inner = {
          width: adjust,
          maxWidth: adjust,
        };
      }
    } else {
      inner = {
        flex: 1,
      };
    }

    return (
      <View style={styles.outer} onLayout={this._onLayout}>
        <View style={{ flex: spacerFlex }}/>
        <View style={[ inner, ..._style ]}>
          {children}
        </View>
        <View style={{ flex: spacerFlex }}/>
      </View>
    );
  }
}

Container.defaultProps = {
  testWidth: 600,
  adjust: 500,
};

Container.propTypes = {
  testWidth: PropTypes.number,
  adjust: PropTypes.number,
  children: PropTypes.node.isRequired,
  style: PropTypes.any,
};

export default Container;
