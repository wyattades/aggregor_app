import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

// TODO

class FeedEdit extends Component {

  static propTypes = {
    selectedFeed: PropTypes.string
  }

  _updateTitle = (feed) => {
    this.props.navigation.setParams({ feed });
  }

  componentWillMount() {
    this._updateTitle(this.props.selectedFeed);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedFeed !== this.props.selectedFeed) {
      this._updateTitle(nextProps.selectedFeed);
    }
  }

  render() {
    return (
      <View>
        <Text>FeedEdit Page</Text>
      </View>
    );
  }
}

export default connect(({ selectedFeed }) => ({
  selectedFeed
}))(FeedEdit);