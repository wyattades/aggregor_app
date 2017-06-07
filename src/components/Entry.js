import React, { PropTypes, PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Image, Linking } from 'react-native';
import TimeAgo from 'react-native-timeago';

import theme from '../utils/theme';

const styles = StyleSheet.create({
  container: {
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

  _pressItem = link => () => {
    
    // NOTE: for now don't use WebContent container when opening links

    Linking.canOpenURL(link).then(supported => {
      if (!supported) {
        ToastAndroid.show('Can\'t open url: ' + link, ToastAndroid.SHORT);
        // this.props.navigation.navigate('WebContent', { 
        //   source: item.link,
        //   title: item.title,
        // });
      } else {
        return Linking.openURL(link);
      }
    }).catch(err => ToastAndroid.show('Web connection error: ' + err, ToastAndroid.SHORT));
  }

  _title_format(thumbnailURL, title) {
    var disp_title = title;
    if (title.length > 120) {
      disp_title = title.substring(0, 120);
      disp_title += '...';
    }
    return (
      <Text style={[styles.title, thumbnailURL ? {marginLeft: 5, maxWidth: 250} : null]}>{disp_title}</Text>
    );
  }
  
  render() {
    const { title, author, date, onPress, thumbnailURL, plugin, commentAmount, commentURL, link, authorURL } = this.props;
    return (
      <TouchableNativeFeedback onPress={this._pressItem(link)}>
          <View style={[styles.container, thumbnailURL ? {height: 200} : {height: 166}]}>
            <View style={thumbnailURL ? styles.topRow : null}>
              {thumbnailURL ? <Image source={{ uri: thumbnailURL }} style={styles.thumbnail}/> : null}
              {this._title_format(thumbnailURL, title)}
            </View>
            <Text style={styles.secondary_text} onPress={this._pressItem(commentURL)}>{commentAmount} comments</Text>
            <View style={styles.footer}>
              <Text style={styles.secondary_text} onPress={this._pressItem(authorURL)}>{plugin} : {author}</Text>
              <TimeAgo style={styles.secondary_text} time={date}/>
            </View>
          </View>
      </TouchableNativeFeedback>
    );
  }
}

Entry.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Entry;