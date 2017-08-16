import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import theme from '../utils/theme';
import { formatPluginTitle, formatPluginSubtitle } from '../utils/format';
import PluginIcon from '../components/PluginIcon';
import { Message, MessageView } from '../components/Message';
import { FeedEditHeader } from '../components/Header';
import ActionButton from '../components/ActionButton';
import Touchable from '../components/Touchable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  item: {
    height: 72,
    backgroundColor: theme.WHITE,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.SUPPORT,
    flexDirection: 'row',
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
  pluginIcon: {
    marginRight: 16,
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
      <Touchable key={item.id} onPress={this._editPlugin(item)} style={styles.item}>
        <PluginIcon plugin={plg} size={40}/>
        <View style={styles.textView}>
          <Text style={[styles.title]} numberOfLines={1}>{title}</Text>
          <Text style={[styles.subtitle, item.error ? styles.error : null]} numberOfLines={1}>{subtitle}</Text>
        </View>
      </Touchable>
    );
  }

  _addPlugin = () => this.props.navigation.navigate('PluginEdit', {
    selectedFeed: this.props.selectedFeed,
    plugin: 'new',
  });

  _editPlugin = plugin => () => this.props.navigation.navigate('PluginEdit', {
    plugin: plugin.id,
    selectedFeed: this.props.selectedFeed,
  });

  _keyExtractor = item => item.id;

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
          style={{ container: styles.button }}
          onPress={this._addPlugin}/>
      </View>
    );
  }
}

FeedEdit = connect(({ feeds, plugin_types }, { navigation }) => {
  const selectedFeed = navigation.state.params && navigation.state.params.selectedFeed;
  const feed = feeds.get(selectedFeed);
  return {
    selectedFeed,
    plugin_types,
    plugins: feed ? feed.get('plugins').toArray().map(plugin => plugin.toJS()) : [],
  };
})(FeedEdit);

FeedEdit.navigationOptions = {
  header: FeedEditHeader,
};

FeedEdit.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        selectedFeed: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default FeedEdit;
