import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Switch, Route } from 'react-router-native';

import { fetchFeed } from '../actions/api';
import { goHome } from '../actions/navActions';
import Entry from '../components/Entry';
import { DashboardHeader } from '../components/Header';
import InfList from '../components/InfList';
import Touchable from '../components/Touchable';
import theme from '../utils/theme';

import FeedEdit from './FeedEdit';
import PluginEdit from './PluginEdit';

// TODO: don't allow viewing of NoFeeds???

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.WHITE,
  },

  editor: {
    width: 400,
    maxWidth: 400,
    flex: 1,
    // equivalent to: boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,

    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
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

  itemIndexContainer: {
    position: 'absolute',
    top: 0,
    left: -150,
    width: 150,
    padding: 16,
  },
  itemIndex: {
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32,
    color: theme.SUPPORT,
    textAlign: 'right',
  },
});

export const NoFeeds = () => (
  <View style={styles.messageView}>
    <Text style={styles.message}>You don't have any feeds yet!</Text>
    <Text style={styles.message}>You can manage your feeds in the drawer menu at the top left.</Text>
  </View>
);

export const NoPlugins = () => (
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

  state = {
    refreshing: false,
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.entries.length < this.props.entries.length) {
      this._entryList.scrollToIndex(0);
    }
  }

  _page = 1

  _setRefreshing = refreshing => this.setState({ refreshing });

  _fetchFeed = () => {
    const { dispatch, selectedFeed } = this.props;

    return dispatch(fetchFeed(selectedFeed, this._page))
    .then(() => this._setRefreshing(false));
  }

  _onRefresh = () => {
    this._requestMore();
    this._setRefreshing(true);
  }

  _requestMore = () => {
    this._page++;
    return this._fetchFeed();
  }

  _keyExtractor = item => item.id;

  _renderItem = ({ item, index }) => (
    <View>
      { Platform.OS === 'web' ? (
        <View style={styles.itemIndexContainer}>
          <Text style={styles.itemIndex}>{index + 1}</Text>
        </View>
      ) : null }
      <Entry
        {...item.toObject()}
        plugin={this.props.plugin_types[item.plugin]}/>
    </View>
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

const editorView = (Content, dispatch) => props => {
  const Header = Content.header;
  return (
    <View style={styles.editor}>
      <Content {...props}/>
      { Header ? <Header dispatch={dispatch} match={props.match}/> : null }
    </View>
  );
};

let Dashboard = ({ feeds, selectedFeed, plugin_types, mobile, dispatch, match }) => {
  const feed = feeds.get(selectedFeed);

  if (feed) {
    const entries = feed.get('entries').toArray(),
          plugins = feed.get('plugins'),
          errors = plugins.count(plugin => plugin.error !== undefined);

    const content = plugins.size === 0 ? (
      <NoPlugins/>
    ) : (
      <NonemptyDashboard
        entries={entries}
        plugin_types={plugin_types}
        errors={errors}
        loading={errors !== plugins.size}
        dispatch={dispatch}
        selectedFeed={selectedFeed}/>
    );

    return mobile ? content : (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {content}
        <Switch>
          <Route path={`${match.path}/edit/:plugin`} component={editorView(PluginEdit, dispatch)}/>
          <Route path={`${match.path}/edit`} component={editorView(FeedEdit, dispatch)}/>
        </Switch>
      </View>
    );

  } else {
    return <NoFeeds/>;
  }
};

Dashboard = connect(({ feeds, plugin_types }, { match }) => ({
  feeds,
  selectedFeed: match.params && match.params.selectedFeed,
  plugin_types,
}))(Dashboard);

Dashboard.header = DashboardHeader;

Dashboard.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Dashboard;
