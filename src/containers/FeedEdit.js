import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import { ActionButton } from 'react-native-material-ui';

import theme from '../utils/theme';
import { PluginIcon } from '../utils/plugins';

// TODO: use ActionButton from 'react-native-material-ui'???, make list look pretty!

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // form: {
  //   flexDirection: 'row',
  //   borderBottomColor: theme.SUPPORT,
  //   borderBottomWidth: 1,
  //   // padding: 24
  // },
  // inputGroup: {
  //   flex: 0.8,
  // },
  // input: {
  //   borderWidth: 0,
  //   borderColor: 'transparent',
  //   paddingLeft: 72,
  // },
  // submit: {
  //   flex: 0.2,
  //   marginTop: 0,
  //   height: 48
  // },

  item: {
    height: 72,
    backgroundColor: theme.WHITE,
    padding: 16,
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
  // header: {
  //   height: 48,
  //   paddingLeft: 72,
  //   backgroundColor: theme.WHITE,
  //   justifyContent: 'center',
  //   borderBottomWidth: 1,
  //   borderBottomColor: theme.SUPPORT,
  // },
  // headerText: {
  //   fontWeight: '500',
  //   color: theme.TEXT_SECOND,
  // },
  // divider: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: theme.SUPPORT,
  // }
});

class FeedEdit extends Component {
  
  _pluginItem = (item, index) => {
    const error = item.status === 'error' && item.error;
    let subtitle = ' ';
    if (error) {
      subtitle = item.error;
    } else if (item.status === 'loading') {
      subtitle = 'Loading...';
    } else if (item.status === 'success') {
      subtitle = 'Successfully loaded';
    }

    return (
      <TouchableNativeFeedback key={item.id} onPress={this._editPlugin(item)}>
        <View style={styles.item}>
          <PluginIcon plugin={item.feed} size={40}/>
          <View style={styles.textView}>
            <Text style={[styles.title]} numberOfLines={1}>{item.data && item.data.url}</Text>
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
        <ScrollView>
          {plugins.map(this._pluginItem)}          
        </ScrollView>
        <ActionButton
          style={{ container: styles.button }}
          onPress={this._addPlugin}/>
      </View>
    );
  }
}

FeedEdit = connect(({ feeds }, { navigation }) => {
  const selectedFeed = navigation.state.params.selectedFeed;
  const feed = feeds.get(selectedFeed);
  return {
    selectedFeed,
    plugins: feed.get('plugins').toArray().map(plugin => plugin.toJS()),
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