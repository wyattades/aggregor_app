import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, Linking, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Share from '../utils/Share';
import theme from '../utils/theme';
import alert from '../utils/alert';
import PluginIcon from './PluginIcon';
import TimeAgo from './TimeAgo';
import Touchable from './Touchable';

const MARGIN = Platform.OS === 'web' ? 1 : 6;
const __BLANK__ = '\u00a0';

// (padding * 3) + smallText + pluginIcon + MARGIN
const ROW_BASE = (16 * 3) + 17 + 36 + MARGIN;

export const getRowHeight = data => {
  const length = data.title.length;

  const charsPerRow = data.thumbnailURL ? 60.0 : 100.0;

  return ROW_BASE + (Math.ceil(length / charsPerRow) * 24);
};

const THUMBNAIL = Platform.OS === 'web' ? 100 : 80;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.WHITE,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomColor: theme.SUPPORT,
    borderBottomWidth: MARGIN,
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  iconLabel: {
    marginLeft: 2,
    marginTop: Platform.OS === 'web' ? -4 : 0,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  itemsCenter: {
    alignItems: 'center',
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
    width: THUMBNAIL,
    height: THUMBNAIL,
    borderRadius: 4,
  },
  thumbnailContainer: {
    width: THUMBNAIL,
    height: THUMBNAIL,
    marginLeft: 16,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: theme.SUPPORT,
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

const IconLabel = ({ icon, label, onPress, title }) => (
  <Touchable feedback="uncontained" onPress={onPress} style={styles.iconLabelContainer} title={title}>
    <Icon name={icon} size={24} color={theme.TEXT_SECOND}/>
    {label !== undefined ? <Text style={[ styles.secondaryText, styles.iconLabel ]}>{label}</Text> : null}
  </Touchable>
);

const sharePost = url => () => Share.share({
  message: url,
})
.then(() => {})
.catch(() => alert('Failed to share link'));

const favoritePost = data => () => {
  alert('Sorry, favoriting is not yet supported!');
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

class Entry extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.id !== this.props.id;
  }

  render() {
    const { title, author, date, thumbnailURL, plugin, category,
      commentAmount, link, commentURL, authorURL, categoryURL, id } = this.props;

    return (
      <Touchable
        onPress={pressLink(link)}
        style={[ styles.container, styles.flexCol ]}>
        <View style={[styles.flexRow, styles.spaceBetween, { flexWrap: 'wrap' }]}>
          <View style={{ flex: 1, marginBottom: 16 }}>
            <Text numberOfLines={4} style={styles.title}>{title}</Text>
            {category ? (
              <Touchable feedback="uncontained" onPress={pressLink(categoryURL)} style={styles.category}>
                <Text style={styles.secondaryText}>({category})</Text>
              </Touchable>
            ) : null}
          </View>
          {thumbnailURL ? (
            <View style={styles.thumbnailContainer}>
              <Image source={{ uri: thumbnailURL }} style={[styles.thumbnail]}/>
            </View>
          ) : null}
        </View>
        <View style={[ styles.flexRow, styles.spaceBetween, { flexWrap: 'nowrap' } ]}>
          <View style={[ styles.flexRow, styles.itemsCenter ]}>
            <PluginIcon plugin={plugin} size={36}/>
            <View style={[styles.flexCol, { marginLeft: 5 }]}>
              <View style={styles.flexRow}>
                <Text style={styles.secondaryText}>by </Text>
                <Touchable feedback="uncontained" onPress={pressLink(authorURL)} style={styles.flexRow}>
                  <Text style={[styles.secondaryText, styles.secondaryEmphasis]} numberOfLines={1}>{author}</Text>
                </Touchable>
              </View>
              {date ?
                <TimeAgo style={styles.secondaryText} time={date}/> :
                <Text style={styles.secondaryText}>{__BLANK__}</Text>}
            </View>
          </View>
          <View style={[styles.flexCol, styles.flexEnd ]}>
            <View style={styles.iconRow}>
              <IconLabel
                icon="favorite"
                title="Favorite"
                onPress={favoritePost(this.props)}/>
              <IconLabel icon="comment" title={`${commentAmount} Comments`} onPress={pressLink(commentURL)}/>
              <IconLabel icon="share" title="Share" onPress={sharePost(link)}/>
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
