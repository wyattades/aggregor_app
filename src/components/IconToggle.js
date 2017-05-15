import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, Text } from 'react-native';

class IconToggle extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired
  }

  state = {
    active: false
  }

  handlePress = () => {
    this.props.onPress();
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    return (
      <TouchableHighlight onPress={this.handlePress}>
        <Text>{ this.state.active ? 'ToggledOn' : 'ToggledOff' }</Text>
      </TouchableHighlight>
    );
  }

}

export default IconToggle;