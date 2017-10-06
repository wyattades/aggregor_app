import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';

import theme from '../utils/theme';
import { formatPluginTitle, formatPluginSubtitle } from '../utils/format';
import { pushHome } from '../actions/navActions';

import PluginIcon from '../components/PluginIcon';
import { Message, MessageView } from '../components/Message';
import { FeedEditHeader } from '../components/Header';
import ActionButton from '../components/ActionButton';
import Touchable from '../components/Touchable';

const ICON_SIZE = Platform.OS === 'web' ? 48 : 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  item: {
    padding: 16,
    backgroundColor: theme.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: theme.SUPPORT,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: theme.TEXT,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: theme.TEXT_SECOND,
  },
  error: {
    color: theme.ERROR,
  },
  textView: {
    marginLeft: 16,
    flex: 1,
  },
  button: {
    backgroundColor: theme.ACCENT,
  },
});

class FeedEdit extends Component {
  
  _pluginItem = item => {

    const plg = this.props.plugin_types[item.type],
          title = formatPluginTitle(plg, item),
          subtitle = formatPluginSubtitle(item);

    return (
      <Touchable key={item.id} onPress={this._pluginEdit(item.id)} style={styles.item}>
        <PluginIcon plugin={plg} size={ICON_SIZE}/>
        <View style={styles.textView}>
          <Text style={[styles.title]} numberOfLines={1}>{title}</Text>
          <Text style={[styles.subtitle, item.error ? styles.error : null]} numberOfLines={1}>{subtitle}</Text>
        </View>
      </Touchable>
    );
  }

  _pluginEdit = plugin => () => {
    const { dispatch, selectedFeed } = this.props;
    dispatch(pushHome(selectedFeed, plugin));
  }

  render() {
    const { plugins } = this.props;
    return (
      <View style={styles.container}>
        { plugins.length === 0 ? (
          <MessageView>
            <Message text="Add new sources with the button below."/>
          </MessageView>
        ) : (
          <ScrollView>
            {plugins.map(this._pluginItem)}
          </ScrollView>
        )}
        <ActionButton
          style={styles.button}
          onPress={this._pluginEdit('new')}/>
      </View>
    );
  }
}

FeedEdit = connect(({ feeds, plugin_types }, { match }) => {
  
  const params = match.params;
  const selectedFeed = params && params.selectedFeed;
  const feed = feeds.get(selectedFeed);

  return {
    selectedFeed,
    plugin_types,
    plugins: feed ? feed.get('plugins').toArray().map(plugin => plugin.toJS()) : [],
  };
})(FeedEdit);

FeedEdit.header = FeedEditHeader;

FeedEdit.propTypes = {
  match: PropTypes.object.isRequired,
};

export default FeedEdit;
