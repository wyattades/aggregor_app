import React, { PureComponent, PropTypes } from 'react';
import { View, FlatList, Linking, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import { fetchFeed } from '../actions/api';
import Entry from '../components/Entry';
import { Message, MessageView } from '../components/Message';

// TODO: add indicator for loading and plugin errors at top of feed

const NoFeeds = () => (
  <MessageView>
    <Message text="You don't have any feeds yet!"/>
    <Message text="You can manage your feeds in the drawer menu at the top left."/>
  </MessageView>
);

const NoPlugins = () => (
  <MessageView>
    <Message text="You don't have any sources in this feed."/>
    <Message text="Click the edit button above to add some!"/>
  </MessageView>
);

class NonemptyDashboard extends PureComponent {

  state = {
    refreshing: false,
    page: 0,
  }

  _onRefresh = () => {
    this.setState({ 
      page: 0
    }, this._requestEntries);
  }

  _requestEntries = page => () => {
    this.setState({ refreshing: true }, () => {

      const { selectedFeed, dispatch } = this.props;

      dispatch(fetchFeed(selectedFeed, page)).then(() => this.setState({ 
        refreshing: false,
        page,
      }), () => {
        this.setState({ 
          refreshing: false
        });
      });
    });
  }

  _pressItem = item => () => {
    
    // NOTE: for now don't use WebContent container when opening links

    Linking.canOpenURL(item.link).then(supported => {
      if (!supported) {
        ToastAndroid.show('Can\'t open url: ' + item.link, ToastAndroid.SHORT);
        // this.props.navigation.navigate('WebContent', { 
        //   source: item.link,
        //   title: item.title,
        // });
      } else {
        return Linking.openURL(item.link);
      }
    }).catch(err => ToastAndroid.show('Web connection error: ' + err, ToastAndroid.SHORT));
  }

  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => (
    <Entry 
      {...item.toObject()} 
      onPress={this._pressItem(item)}/>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          onRefresh={this._requestEntries(1)}
          refreshing={this.state.refreshing}
          data={this.props.entries}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          onEndReached={this._requestEntries(this.state.page + 1)}
          onEndThreshold={0}
        />
      </View>
    );
  }
}

let Dashboard = ({ feeds, selectedFeed, dispatch, navigation }) => {
  const feed = feeds.get(selectedFeed);

  if (feed) {
    const entries = feed.get('entries').toArray(),
          plugins = feed.get('plugins').toArray();

    return plugins.length === 0 ? (
      <NoPlugins/>
    ) : (
      <NonemptyDashboard 
        entries={entries}
        plugins={plugins}
        dispatch={dispatch}
        navigation={navigation}
        selectedFeed={selectedFeed}/>
    );
  } else {
    return (
      <NoFeeds/>
    );
  }
};

Dashboard = connect(({ feeds }, { navigation }) => ({
  feeds,
  selectedFeed: navigation.state.params && navigation.state.params.selectedFeed,
}))(Dashboard);

Dashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Dashboard;