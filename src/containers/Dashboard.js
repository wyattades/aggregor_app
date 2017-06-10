import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { fetchFeed } from '../actions/api';
import Entry from '../components/Entry';
import theme from '../utils/theme';

// TODO: add indicator for loading and plugin errors

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 

  message: {
    fontSize: 20,
    margin: 16,
    marginHorizontal: 40,
    textAlign: 'center',
  },
  messageView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 96,
  },

  errorView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.ERROR,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  errorText: {
    color: theme.WHITE,
    fontSize: 16,
    marginLeft: 8,
  },
});

const NoFeeds = () => (
  <View style={styles.messageView}>
    <Text style={styles.message}>You don't have any feeds yet!</Text>
    <Text style={styles.message}>You can manage your feeds in the drawer menu at the top left.</Text>
  </View>
);

const NoPlugins = () => (
  <View style={styles.messageView}>
    <Text style={styles.message}>You don't have any sources in this feed.</Text>
    <Text style={styles.message}>Click the edit button above to add some!</Text>
  </View>
);

const LoadingIndicator = () => (
  <View style={styles.loadingView}>
    <ActivityIndicator
      color={theme.PRIMARY}
      size="large"/>
  </View>
);

class NonemptyDashboard extends PureComponent {

  state = {
    refreshing: false,
    page: 1,
  }

  _fetchFeed = () => {
    const { dispatch, selectedFeed } = this.props;
    const page = this.state.page;

    dispatch(fetchFeed(selectedFeed, page))
    .then(() => this.setState({
      refreshing: false,
    }));
  }

  _onRefresh = () => this.setState({ 
    page: 1,
    refreshing: true,
  }, this._fetchFeed);

  _requestMore = () => this.setState({
    page: this.state.page + 1,
  }, this._fetchFeed);

  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => (
    <Entry {...item.toObject()}/>
  );

  render() {
    const { entries, errors, loading } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          data={entries}
          renderItem={this._renderItem}
          ListFooterComponent={loading ? LoadingIndicator : undefined}
          keyExtractor={this._keyExtractor}
          onEndReached={this._requestMore}
          onEndThreshold={4}
        />
        {errors > 0 ? (
          <View style={styles.errorView}>
            <Icon name="error" size={20} color={theme.WHITE}/>
            <Text style={styles.errorText}>{errors} plugin{errors === 1 ? '' : 's'} failed to load</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

let Dashboard = ({ feeds, selectedFeed, dispatch, navigation }) => {
  const feed = feeds.get(selectedFeed);

  if (feed) {
    const entries = feed.get('entries').toArray(),
          plugins = feed.get('plugins');

    let errors = 0;
    plugins.forEach(plugin => {
      if (plugin.error !== undefined) {
        errors++;
      }
    });

    return plugins.size === 0 ? (
      <NoPlugins/>
    ) : (
      <NonemptyDashboard 
        entries={entries}
        errors={errors}
        loading={errors !== plugins.size}
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