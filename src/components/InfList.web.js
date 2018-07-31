import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import List from 'react-infinite';
import { getRowHeight } from './Entry';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    maxWidth: 1000,
    marginHorizontal: 'auto',
  },
});

class InfList extends Component {
  
  state = {
    height: 1,
  }

  containerRef = React.createRef();

  componentDidMount() {
    this.containerRef.current.measure((x, y, w, h) => {
      this.setState({
        height: h,
      });
    });
  }

  scrollToIndex = index => window.scrollTo(0, index * 150);

  render() {
    const { refreshing, onEndThreshold, data, renderItem: Item,
      onEndReached, ListFooterComponent, keyExtractor } = this.props;

    return (
      <View ref={this.containerRef} style={styles.container}>
        <List
          elementHeight={data.map(item => getRowHeight(item))}
          infiniteLoadBeginEdgeOffset={onEndThreshold * 130}
          onInfiniteLoad={onEndReached}
          loadingSpinnerDelegate={ListFooterComponent ? <ListFooterComponent/> : null}
          isInfiniteLoading={refreshing || data.length === 0}
          containerHeight={this.state.height}
        >
          {data.map((item, index) => (
            <View style={styles.item} key={keyExtractor(item)}>
              <Item item={item} index={index}/>
            </View>
          ))}
        </List>
      </View>
    );
  }
}

export default InfList;
