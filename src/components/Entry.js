import React, { PropTypes, PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native';
import TimeAgo from 'react-native-timeago';

import theme from '../utils/theme';

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginBottom: 8,
    padding: 16,
    backgroundColor: theme.WHITE,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  topRow: {
    flexDirection: 'row',
  },
  footer: {
    flexDirection:'row',
    justifyContent: 'space-between'
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
  secondary_text: {
    fontSize: 15,
    color: theme.TEXT_SECOND,
  },
});

class Entry extends PureComponent {

  shouldComponentUpdate() {
    return false;
  }

  _title_format(thumbnailURL, title) {
    var disp_title = title;
    if (title.length > 120) {
      disp_title = title.substring(0, 120);
      disp_title += '...';
    }
    return (
      // TODO: title goes offscreen instead of wrapping below when make a margin between it and thumbnail
      <Text style={[styles.title, thumbnailURL ? {marginLeft: 5} : null]}>{disp_title}</Text>
    );
  }

  render() {
    const { title, author, date, onPress, thumbnailURL, plugin, commentAmount, commentURL } = this.props;
    return (
      <TouchableNativeFeedback onPress={onPress}>
          <View style={[styles.container, thumbnailURL ? {height: 200} : {height: 166}]}>
            <View style={thumbnailURL ? styles.topRow : null}>
              {thumbnailURL ? <Image source={{ uri: thumbnailURL }} style={styles.thumbnail}/> : null}
              {this._title_format(thumbnailURL, title)}
            </View>
            <Text style={styles.secondary_text}>{commentAmount} comments</Text>
            <View style={styles.footer}>
              <Text style={styles.secondary_text}>{plugin} : {author}</Text>
              <TimeAgo style={styles.secondary_text} time={date}/>
            </View>
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