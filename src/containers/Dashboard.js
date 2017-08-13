import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { fetchFeed } from '../actions/api';
import { goHome } from '../actions/navActions';
import Entry from '../components/Entry';
import { DashboardHeader } from '../components/Header';
import InfList from '../components/InfList';
import Touchable from '../components/Touchable';
import theme from '../utils/theme';

// TODO: don't allow viewing of NoFeeds???

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

class NonemptyDashboard extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      refreshing: false,
    };

    this.setRefreshing = this.setRefreshing.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.entries.length < this.props.entries.length) {
      this._entryList.scrollToIndex(0);
    }
  }

  setRefreshing(refreshing) {
    this.setState({
      refreshing,
    });
  }

  _page = 1

  _fetchFeed = () => {
    const { dispatch, selectedFeed } = this.props;

    return dispatch(fetchFeed(selectedFeed, this._page))
    .then(() => this.setRefreshing(false));
  }

  _onRefresh = () => {
    this._requestMore();
    this.setRefreshing(true);
  }

  _requestMore = () => {
    this._page++;
    return this._fetchFeed();
  }

  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => (
    <Entry
      {...item.toObject()}
      plugin={this.props.plugin_types[item.plugin]}/>
  );

  _goToError = () => {
    const { dispatch, selectedFeed } = this.props;
    dispatch(goHome(selectedFeed, true));
  }

  _renderError = () => (
    <Touchable onPress={this._goToError} style={styles.errorView}>
      <Icon name="error" size={20} color={theme.WHITE}/>
      <Text style={styles.errorText}>
        {this.props.errors} plugin{this.props.errors === 1 ? '' : 's'} failed to load
      </Text>
    </Touchable>
  );

  render() {
    const { entries, errors, loading } = this.props;
    const RenderError = this._renderError;
    return (
      <View style={styles.container}>
        <InfList
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          data={entries}
          renderItem={this._renderItem}
          ListFooterComponent={loading ? LoadingIndicator : undefined}
          keyExtractor={this._keyExtractor}
          onEndReached={this._requestMore}
          onEndThreshold={4}
          ref={_entryList => { this._entryList = _entryList; }}
        />
        {errors > 0 ? <RenderError/> : null}
      </View>
    );
  }
}

let Dashboard = ({ feeds, selectedFeed, plugin_types, dispatch, navigation }) => {
  const feed = feeds.get(selectedFeed);

  if (feed) {
    const entries = feed.get('entries').toArray(),
          plugins = feed.get('plugins'),
          errors = plugins.count(plugin => plugin.error !== undefined);

    return plugins.size === 0 ? (
      <NoPlugins/>
    ) : (
      <NonemptyDashboard
        entries={entries}
        plugin_types={plugin_types}
        errors={errors}
        loading={errors !== plugins.size}
        dispatch={dispatch}
        navigation={navigation}
        selectedFeed={selectedFeed}/>
    );
  }
  return (
    <NoFeeds/>
  );
  
};

Dashboard = connect(({ feeds, plugin_types }, { navigation }) => ({
  feeds,
  selectedFeed: navigation.state.params && navigation.state.params.selectedFeed,
  plugin_types,
}))(Dashboard);

Dashboard.navigationOptions = {
  header: DashboardHeader,
};

Dashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Dashboard;
