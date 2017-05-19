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

const exEntries = [
  {
    id: 0,
    title: 'How do you do'
  },
  {
    id: 1,
    title: 'cows are fun'
  }
];

class Dashboard extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  state = {
    refreshing: false
  }

  componentWillMount() {
    this._updateTitle(this.props.selectedFeed);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedFeed !== this.props.selectedFeed) {
      this._updateTitle(nextProps.selectedFeed);
    }
  }

  componentDidMount() {
    this._fetchFeed().then(() => {

    });
  }

  _updateTitle = (feed) => {
    this.props.navigation.setParams({ feed });
  }

  _keyExtractor = (item, index) => item.id;

  _fetchFeed = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this._fetchFeed().then(() => {
      this.setState({ refreshing: false });
    });
  }

  _renderItem = ({ item }) => (
    <Entry {...item}/>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          data={this.props.entries}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
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