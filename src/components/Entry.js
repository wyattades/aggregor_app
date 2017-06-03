import React, { PropTypes, PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';

import theme from '../utils/theme';

// TODO: finish designing Entry component

const styles = StyleSheet.create({
  container: {
    height: 256,
    marginBottom: 8,
    padding: 16,
    backgroundColor: theme.WHITE,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    color: theme.TEXT,
  },
  thumbnail: {
    width: 64,
    height: 64,
  },
  author_date: {
    fontSize: 15,
    color: theme.TEXT_SECOND
  }
});

class Entry extends PureComponent {

  shouldComponentUpdate() {
    return false;
  }

  _date_format(date) {
    var temp = new Date(date);
    var date = temp.toDateString();
    var time = temp.toLocaleTimeString();
    return (
        <Text style={styles.author_date}>{date} {time}</Text>
      )
  }

  render() {
    const { title, author, date, link, onPress, thumbnailURL } = this.props;
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.container}>
          {thumbnailURL ? <Image source={{ uri: thumbnailURL }} style={styles.thumbnail}/> : null}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author_date}>{author}</Text>
          {this._date_format(date)}
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