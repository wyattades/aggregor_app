import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'; // or can i just use div cause its a web.js file?

import List from 'react-infinite';
import { getRowHeight } from './Entry';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class InfList extends Component {
  
  state = {
    height: 1,
  }

  componentDidMount() {
    /* eslint-disable */
    this.setState({
      height: document.getElementById('InfListWeb').clientHeight,
    });
    /* eslint-enable */
  }

  scrollToIndex = index => window.scrollTo(0, index * 150);

  render() {
    const { refreshing, onEndThreshold, data, renderItem: Item,
      onEndReached, ListFooterComponent, keyExtractor } = this.props;

    return (
      <View id="InfListWeb" style={styles.container}>
        <List
          elementHeight={data.map(item => getRowHeight(item))}
          infiniteLoadBeginEdgeOffset={onEndThreshold * 130}
          onInfiniteLoad={onEndReached}
          loadingSpinnerDelegate={<ListFooterComponent/>}
          isInfiniteLoading={refreshing || data.length === 0}
          containerHeight={this.state.height}
        >
          {data.map(item => <Item key={keyExtractor(item)} item={item}/>)}
        </List>
      </View>
    );
  }
}

export default InfList;
