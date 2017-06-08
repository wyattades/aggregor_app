import React, { PropTypes, PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Image, Linking, ToastAndroid, Share } from 'react-native';
import TimeAgo from 'react-native-timeago';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../utils/theme';
import { PluginIcon } from '../utils/plugins';

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    padding: 16,
    backgroundColor: theme.WHITE,
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexRow: { 
    flexDirection: 'row',
  },
  flexCol: { 
    flexDirection: 'column',
  },
  spaceBetween: { 
    justifyContent: 'space-between',
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
  secondaryText: {
    fontSize: 13,
    color: theme.TEXT_SECOND,
    fontWeight: '400',
  },
  secondaryEmphasis: { 
    fontWeight: '500',
  },
  category: {
    alignSelf: 'flex-start',
  }
});

const sharePost = url => () => {
  Share.share({
    message: url,
  })
  .then(() => {}) 
  .catch(() => ToastAndroid.show('Failed to share link', ToastAndroid.SHORT));
};

const ripple = TouchableNativeFeedback.SelectableBackgroundBorderless();

const Link = ({ onPress, style, children, containRipple }) => (
  <TouchableNativeFeedback onPress={onPress} background={containRipple ? undefined : ripple}>
    <View style={style}>
      {children}
    </View>
  </TouchableNativeFeedback>
);

const pressLink = url => () => {
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
  }).catch(err => {
    if (typeof err !== 'string') {
      err = 'Unknown Error';
    }
    ToastAndroid.show('Web connection error: ' + err, ToastAndroid.SHORT);
  });
};

class Entry extends PureComponent {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { title, author, date, thumbnailURL, plugin, category, commentAmount, link, commentURL, authorURL, categoryURL } = this.props;

    return (
      <Link containRipple={true} onPress={pressLink(link)} style={[styles.container, styles.flexCol, thumbnailURL ? {height: 200} : {height: 166}]}>
        <View style={[styles.flexRow, styles.spaceBetween]}>
          <View>
            <Text numberOfLines={4} style={styles.title}>{title}</Text>
            {category ? <Link onPress={pressLink(categoryURL)} style={styles.category}><Text style={styles.secondaryText}>({category})</Text></Link> : null}   
          </View>
          {thumbnailURL ? <Image source={{ uri: thumbnailURL }} style={styles.thumbnail}/> : null}
        </View>
        <View style={[styles.flexRow, styles.spaceBetween]}>
          <View style={styles.flexRow}>
            <PluginIcon plugin={plugin} size={35}/>
            <View style={[styles.flexCol, {marginLeft: 5}]}>
              <View style={styles.flexRow}>
                <Text style={styles.secondaryText}>by </Text>
                <Link onPress={pressLink(authorURL)} style={styles.flexRow}>
                  <Text style={[styles.secondaryText, styles.secondaryEmphasis]}>{author}</Text>
                </Link>
              </View>
              <TimeAgo style={styles.secondaryText} time={date}/>
            </View>
          </View>
          <View style={[styles.flexCol, {justifyContent: 'flex-end'}]}>
            <View style={styles.flexRow}>
              <Link onPress={pressLink(commentURL)} style={styles.flexRow}>
                <Icon name="comment" size={22} style={{marginRight: 5}}/>
                <Text style={[styles.secondaryText]}>{commentAmount}</Text>
              </Link>
              <Link onPress={sharePost(link)} style={{marginLeft: 10}}>
                <Icon name="share" size={22}/>
              </Link>
            </View>
          </View>
        </View>
      </Link>
    );
  }
}

Entry.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  author: PropTypes.string,
  category: PropTypes.string,
  date: PropTypes.number,
  categoryURL: PropTypes.string,
  thumbnailURL: PropTypes.string,
  commentURL: PropTypes.string,
  authorURL: PropTypes.string,
  plugin: PropTypes.string,
  commentAmount: PropTypes.number,
};

export default Entry;