import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
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

// const pluginsEqual = (p1, p2) => {
//   if (p1.length !== p2.length) {
//     return false;
//   }
//   for (let i = 0; i < p1.length; i++) {
//     if (p1[i].id !== p2[i].id) {
//       return false;
//     }
//   }
//   return true;
// };

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

  _renderItem = ({ item }) => (
    <Entry {...item.toJS()}/>
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

let Dashboard = ({ feeds, selectedFeed, dispatch }) => {
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
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        selectedFeed: PropTypes.string
      })
    })
  }),
};

export default Dashboard;