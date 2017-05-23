import React, { PropTypes, PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontWeight: '500'
  }
});

class Entry extends PureComponent {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

export default Entry;