import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import { ActionButton } from 'react-native-material-ui';

import theme from '../utils/theme';
import PluginIcon from '../components/PluginIcon';
import { Message, MessageView } from '../components/Message';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  item: {
    height: 72,
    backgroundColor: theme.WHITE,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.SUPPORT,
    flexDirection: 'row'
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
  
  _pluginItem = (item, index) => {
    const error = item.error;
    let subtitle = ' ';
    if (error) {
      subtitle = item.error;
    } else {
      subtitle = 'Priority: ' + item.priority;
    }

    const plg = this.props.plugin_types[item.type];
    let label;
    if (plg) {
      label = plg.label;

      const keys = Object.keys(item.data);
      if (keys.length > 0) {
        const getPrefix = key => {
          for (let option of plg.options) {
            if (option.key === key) {
              return option.prefix || '';
            }
          }
          return '';
        };

        label += keys.map(key => ` ${getPrefix(key)}${item.data[key]}`).join('');
      }
    } else {
      label = 'Unknown Plugin';
    }

    return (
      <TouchableNativeFeedback key={item.id} onPress={this._editPlugin(item)}>
        <View style={styles.item}>
          <PluginIcon plugin={plg} size={40}/>
          <View style={styles.textView}>
            <Text style={[styles.title]} numberOfLines={1}>{label}</Text>
            <Text style={[styles.subtitle, error ? styles.error : null]} numberOfLines={1}>{subtitle}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

  _addPlugin = () => this.props.navigation.navigate('PluginEdit', { selectedFeed: this.props.selectedFeed });

  _editPlugin = plugin => () => this.props.navigation.navigate('PluginEdit', { plugin, selectedFeed: this.props.selectedFeed });

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

FeedEdit.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        selectedFeed: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

export default FeedEdit;