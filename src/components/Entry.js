import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, Linking, Share, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../utils/theme';
import alert from '../utils/alert';
import PluginIcon from './PluginIcon';
import TimeAgo from './TimeAgo';
import Touchable from './Touchable';

const MARGIN = Platform.OS === 'web' ? 12 : 6;
const __BLANK__ = '\u00a0';

const getEntryHeight = data => {
  const length = data.title.length;

  let height = 120 + (Math.floor(length / 100.0) * 20);

  if (data.thumbnailURL) {
    height += 34;
  }

  return height;
};

export const getRowHeight = data => getEntryHeight(data) + MARGIN;

const styles = StyleSheet.create({
  container: Object.assign({
    marginBottom: MARGIN,
    padding: 16,
    backgroundColor: theme.WHITE,
    flexDirection: 'column',
    justifyContent: 'space-between',
  }, Platform.OS === 'web' ? {
    borderColor: theme.SUPPORT,
    borderWidth: 1,
  } : {}),
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRow: {
    width: 80,
    paddingHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentCenter: {
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: Platform.OS === 'web' ? 'bold' : '500',
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
    fontWeight: Platform.OS === 'web' ? 'bold' : '500',
  },
  category: {
    alignSelf: 'flex-start',
  },
});

const IconLabel = ({ icon, label, onPress }) => (
  <Touchable feedback="uncontained" onPress={onPress} style={styles.iconLabel}>
    <Icon name={icon} size={22} color={theme.TEXT_SECOND}/>
    {label !== undefined ? <Text style={[styles.secondaryText, { marginLeft: 2 }]}>{label}</Text> : null}
  </Touchable>
);

const sharePost = url => () => {
  Share.share({
    message: url,
  })
  .then(() => {})
  .catch(() => alert('Failed to share link'));
};

const pressLink = url => () => {
// NOTE: for now don't use WebContent container when opening links

  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      alert(`Can't open url: ${url}`);
      // this.props.navigation.navigate('WebContent', { 
      //   source: item.link,
      //   title: item.title,
      // });
      return Promise.resolve();
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => {
    if (typeof err !== 'string') {
      err = 'Unknown Error';
    }
    alert(`Web connection error: ${err}`);
  });
};

class Entry extends PureComponent {

  shouldComponentUpdate(nextProps) {
    return nextProps.id !== this.props.id;
  }

  render() {
    const { title, author, date, thumbnailURL, plugin, category,
      commentAmount, link, commentURL, authorURL, categoryURL } = this.props;

    return (
      <Touchable
        onPress={pressLink(link)}
        style={[styles.container, styles.flexCol, { minHeight: getEntryHeight(this.props) }]}>
        <View style={[styles.flexRow, styles.spaceBetween, { flexWrap: 'wrap' }]}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={4} style={styles.title}>{title}</Text>
            {category ? (
              <Touchable feedback="uncontained" onPress={pressLink(categoryURL)} style={styles.category}>
                <Text style={styles.secondaryText}>({category})</Text>
              </Touchable>
            ) : null}
          </View>
          {thumbnailURL ? <Image source={{ uri: thumbnailURL }} style={[styles.thumbnail]}/> : null}
        </View>
        <View style={[ styles.flexRow, styles.spaceBetween ]}>
          <View style={[ styles.flexRow, styles.contentCenter ]}>
            <PluginIcon plugin={plugin} size={35}/>
            <View style={[styles.flexCol, { marginLeft: 5 }]}>
              <View style={styles.flexRow}>
                <Text style={styles.secondaryText}>by </Text>
                <Touchable feedback="uncontained" onPress={pressLink(authorURL)} style={styles.flexRow}>
                  <Text style={[styles.secondaryText, styles.secondaryEmphasis]}>{author}</Text>
                </Touchable>
              </View>
              {date ?
                <TimeAgo style={styles.secondaryText} time={date}/> :
                <Text style={styles.secondaryText}>{__BLANK__}</Text>}
            </View>
          </View>
          <View style={[styles.flexCol, styles.flexEnd ]}>
            <View style={styles.iconRow}>
              <IconLabel icon="comment" label={commentAmount} onPress={pressLink(commentURL)}/>
              <IconLabel icon="share" onPress={sharePost(link)}/>
            </View>
          </View>
        </View>
      </Touchable>
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
