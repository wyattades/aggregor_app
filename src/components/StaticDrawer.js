import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import Drawer from './Drawer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300, // TODO: width is redundant property (should use flex-basis?)
    maxWidth: 300,
    
    // equivalent to: boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)' (for iOS and webe)
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    // android
    elevation: 5,
  },
});

class StaticDrawer extends PureComponent {

  state = {
    open: true,
  }

  toggle = () => this.setState({
    open: !this.state.open,
  });

  render() {
    return !this.props.disabled && this.state.open ? (
      <View style={styles.container}>
        <Drawer {...this.props}/>
      </View>
    ) : null;
  }
}

export default StaticDrawer;
