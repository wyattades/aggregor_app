import React, { PropTypes, PureComponent } from 'react';
import { View, Text, StyleSheet, Image, Linking, Share } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../utils/theme';
import alert from '../utils/alert';
import PluginIcon from './PluginIcon';
import TimeAgo from './TimeAgo';
import Touchable from './Touchable';

const MARGIN = 6;
const __BLANK__ = '\u00a0';

const getEntryHeight = data => data.thumbnailURL ? 200 : 166;
export const getRowHeight = data => (data.thumbnailURL ? 200 : 166) + MARGIN;

const styles = StyleSheet.create({
  container: {
    marginBottom: MARGIN,
    padding: 16,
    backgroundColor: theme.WHITE,
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
    marginLeft: 16,
    borderRadius: 4,
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
  .catch(() => alert('Failed to share link'));
};

const Link = ({ onPress, style, children, containRipple }) => (
  <Touchable onPress={onPress} feedback={containRipple ? undefined : 'uncontained'} style={style}>
    {children}
  </Touchable>
);

const pressLink = url => () => {
// NOTE: for now don't use WebContent container when opening links

  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      alert('Can\'t open url: ' + url);
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
    alert('Web connection error: ' + err);
  });
};

class Entry extends PureComponent {

  shouldComponentUpdate(nextProps) {
    return nextProps.id !== this.props.id;
  }

  render() {
    const { title, author, date, thumbnailURL, plugin, category, commentAmount, link, commentURL, authorURL, categoryURL } = this.props;

    return (
      <Link containRipple={true} onPress={pressLink(link)} style={[styles.container, styles.flexCol, { height: getEntryHeight(this.props) }]}>
        <View style={[styles.flexRow, styles.spaceBetween, {flexWrap: 'wrap'}]}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={4} style={styles.title}>{title}</Text>
            {category ? <Link onPress={pressLink(categoryURL)} style={styles.category}><Text style={styles.secondaryText}>({category})</Text></Link> : null}   
          </View>
          {thumbnailURL ? <Image source={{ uri: thumbnailURL }} style={[styles.thumbnail]}/> : null}
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
              {date ? <TimeAgo style={styles.secondaryText} time={date}/> : <Text style={styles.secondaryText}>{__BLANK__}</Text>}
            </View>
          </View>
          <View style={[styles.flexCol, {justifyContent: 'flex-end'}]}>
            <View style={styles.flexRow}>
              <Link onPress={pressLink(commentURL)} style={styles.flexRow}>
                <Icon name="comment" size={22} style={{marginRight: 5}} color={theme.TEXT_SECOND}/>
                <Text style={[styles.secondaryText]}>{commentAmount}</Text>
              </Link>
              <Link onPress={sharePost(link)} style={{marginLeft: 10}}>
                <Icon name="share" size={22} color={theme.TEXT_SECOND}/>
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
  plugin: PropTypes.object,
  commentAmount: PropTypes.number,
  id: PropTypes.string.isRequired,
};

export default Entry;