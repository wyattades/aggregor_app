import React, { PropTypes, PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';

import theme from '../utils/theme';

const styles = StyleSheet.create({
  container: {
    height: 256,
    marginBottom: 8,
    padding: 16,
    backgroundColor: theme.WHITE,
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
    color: theme.TEXT,
  },
  thumbnail: {
    width: 64,
    height: 64,
  }
});

class Entry extends PureComponent {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { title, author, date, link, onPress, thumbnailURL } = this.props;
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.container}>
          {thumbnailURL ? <Image source={{ uri: thumbnailURL }} style={styles.thumbnail}/> : null}
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

Entry.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Entry;