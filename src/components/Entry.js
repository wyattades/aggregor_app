import React, { PropTypes, PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Image, Linking, ToastAndroid } from 'react-native';
import TimeAgo from 'react-native-timeago';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../utils/theme';
import { PluginIcon } from '../utils/plugins';

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    padding: 16,
    backgroundColor: theme.WHITE,
    flex: 1,
    justifyContent: 'space-between'
  },
  flexRow: { flexDirection: 'row', },
  flexCol: { flexDirection: 'column' },
  spaceBetween: { justifyContent: 'space-between' },
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
    fontSize: 13,
    color: theme.TEXT_SECOND,
  },
  secondary_emphasis: { fontWeight: '500' }
});

class Entry extends PureComponent {

  shouldComponentUpdate() {
    return false;
  }

  _pressItem = url => () => {
    
    // NOTE: for now don't use WebContent container when opening links

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        ToastAndroid.show('Can\'t open url: ' + url, ToastAndroid.SHORT);
        // this.props.navigation.navigate('WebContent', { 
        //   source: item.link,
        //   title: item.title,
        // });
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => ToastAndroid.show('Web connection error: ' + err, ToastAndroid.SHORT));
  }

  _title_format(thumbnailURL, title) {
    var disp_title = title;
    if (title.length > 100) {
      disp_title = title.substring(0, 100);
      disp_title += '...';
    }
    return (
      <Text style={[styles.title, thumbnailURL ? {marginRight: 5, maxWidth: 250} : null]}>{disp_title}</Text>
    );
  }

  render() {
    const { title, author, date, thumbnailURL, plugin, commentAmount, commentURL, link, authorURL } = this.props;
    return (
      <View style={[styles.container, styles.flexCol, thumbnailURL ? {height: 200} : {height: 166}]}>
        <TouchableNativeFeedback onPress={this._pressItem(link)}>
          <View style={thumbnailURL ? [styles.flexRow, styles.spaceBetween]: null}>
            {this._title_format(thumbnailURL, title, link)}
            {thumbnailURL ? <Image source={{ uri: thumbnailURL }} style={styles.thumbnail}/> : null}
          </View>
        </TouchableNativeFeedback>
        <View style={[styles.flexRow, styles.spaceBetween]}>
          <View style={styles.flexRow}>
            <PluginIcon plugin={plugin} size={35}/>
            <View style={styles.flexCol, {marginLeft: 5}}>
              <Text>
                <Text style={styles.secondary_text}>by </Text>
                <Text style={[styles.secondary_text, styles.secondary_emphasis]} onPress={this._pressItem(authorURL)}>{author}</Text>
              </Text>
              <TimeAgo style={styles.secondary_text} time={date}/>
            </View>
          </View>
          <View style={styles.flexCol, {justifyContent: 'flex-end'}}>
            <View style={styles.flexRow}>
              <TouchableNativeFeedback onPress={this._pressItem(authorURL)}>
                <View style={styles.flexRow}>
                  <Icon name={"comment"} size={22} style={{marginRight: 5}}/>
                  <Text style={[styles.secondary_text]}>{commentAmount}</Text>
                </View>
              </TouchableNativeFeedback>
              <Icon name={"share"} size={22} style={{marginLeft: 10}}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Entry.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  author: PropTypes.string,
  date: PropTypes.number,
  thumbnailURL: PropTypes.string,
  commentURL: PropTypes.string,
  authorURL: PropTypes.string,
  plugin: PropTypes.string,
  commentAmount: PropTypes.number,
};

export default Entry;