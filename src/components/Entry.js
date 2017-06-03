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
    fontSize: 18,
    color: theme.TEXT,
  },
  thumbnail: {
    width: 80,
    height: 80,
  },
  author_date: {
    fontSize: 15,
    color: theme.TEXT_SECOND,
  },
  author: {
    position: "absolute",
    bottom: 16,
    left: 16
  },
  date: {
    position: "absolute",
    bottom: 16,
    right: 16
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
        <Text style={styles.author_date, styles.date}>{date} {time}</Text>
      )
  }

  _title_format(title) {
    disp_title = title;
    if (title.length > 150) {
      disp_title = title.substring(0, 150);
      disp_title += "..."
    }
    return (
        <Text style={styles.title}>{disp_title}</Text>
      )
  }

  render() {
    const { title, author, date, link, onPress, thumbnailURL } = this.props;
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.container}>
          {thumbnailURL ? <Image source={{ uri: thumbnailURL }} style={styles.thumbnail}/> : null}
          {this._title_format(title)}
          <Text style={styles.author_date, styles.author}>{author}</Text>
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