import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, FlatList, Text, Linking } from 'react-native';
import { connect } from 'react-redux';

import { fetchFeed } from '../actions/api';
import Entry from '../components/Entry';
import theme from '../utils/theme';

const NoFeeds = () => (
  <View>
    <Text>You don't have any feeds yet! You can manage your feeds in the drawer menu at the top left.</Text>
  </View>
);

const NoPlugins = () => (
  <View>
    <Text>You don't have any sources in this feed. Click the edit button above to add some!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.SUPPORT
  }
});

// const Divider = () => (
//   <View/>
// );

class NonemptyDashboard extends Component {

  state = {
    refreshing: false
  }

  _onRefresh = () => {
    const { selectedFeed, dispatch } = this.props;
    this.setState({ refreshing: true });
    dispatch(fetchFeed(selectedFeed)).then(() => {
      this.setState({ refreshing: false });
    });
  }

  _pressItem = item => () => {
    
    // TODO: figure out what to do when opening links
    // for now, don't use WebContent container

    Linking.canOpenURL(item.link).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + item.link);
        // this.props.navigation.navigate('WebContent', { 
        //   source: item.link,
        //   title: item.title,
        // });
      } else {
        return Linking.openURL(item.link);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  _renderItem = ({ item }) => (
    <Entry 
      {...item.toObject()} 
      onPress={this._pressItem(item)}/>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          data={this.props.entries}
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
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
  selectedFeed: navigation.state.params.selectedFeed,
}))(Dashboard);

Dashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Dashboard;