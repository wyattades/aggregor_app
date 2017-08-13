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

    const inner = {
      flex: (this.state.large && adjust <= 1) ? adjust : 1,
      maxWidth: (this.state.large && adjust > 1) ? adjust : undefined,
    };

    return (
      <View style={styles.outer} onLayout={this._onLayout}>
        <View style={[ inner, ..._style ]}>
          {children}
        </View>
      </View>
    );
  }
}

Container.defaultProps = {
  testWidth: 500,
  adjust: 450,
};

Container.propTypes = {
  testWidth: PropTypes.number,
  adjust: PropTypes.number,
  children: PropTypes.node.isRequired,
  style: PropTypes.any,
};

export default Container;
