import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { fetchPlugin } from '../actions/api';
import Entry from '../components/Entry';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});

const pluginsEqual = (p1, p2) => {
  if (p1.length !== p2.length) {
    return false;
  }
  for (let i = 0; i < p1.length; i++) {
    if (p1[i].id !== p2[i].id) {
      return false;
    }
  }
  return true;
};

class Dashboard extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  state = {
    refreshing: false
  }

  componentWillReceiveProps(nextProps) {
    if (!pluginsEqual(nextProps.plugins, this.props.plugins)) {
      this._fetchFeed(nextProps);
    }
  }

  _keyExtractor = (item, index) => index;

  _fetchFeed = (props) => {
    // TODO: create a store action for this?
    const { dispatch, selectedFeed, plugins } = props;
    dispatch({ type: 'CLEAR_ENTRIES', feed: selectedFeed });
    return Promise.all(plugins.map(
      plugin => dispatch(fetchPlugin(selectedFeed, plugin.id))
    ));
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this._fetchFeed(this.props).then(() => {
      this.setState({ refreshing: false });
    }, console.log);
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

export default connect(({ feeds, selectedFeed }) => {
  const feed = feeds.get(selectedFeed);
  return {
    entries: feed ? feed.get('entries').toArray() : [],
    plugins: feed ? feed.get('plugins').toArray() : [],
    selectedFeed,
  };
})(Dashboard);