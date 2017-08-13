import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'; // or can i just use div cause its a web.js file?

import { List, InfiniteLoader, AutoSizer } from 'react-virtualized';
// import 'react-virtualized/styles.css';
import { getRowHeight } from './Entry';

// try react-infinite ???

// TODO: scrolling, row height, and onEndReached don't work correctly

// class InfList extends Component {

//   _list = null

//   scrollToIndex = index => this._list.scrollToIndex(index);

//   _renderRow = ({ index, key }) => {
//     const item = this.props.data[index];
//     return (
//       <this.props.renderItem key={this.props.keyExtractor(item)} item={item}/>
//     );
//   }

//   _onRowsRendered = ({ startIndex }) => {
//     if (this._list === null) {
//       return;
//     }

//     if (this._list.rowCount - startIndex < this.props.onEndThreshold) {
//       this.props.onEndReached();
//     }
//   }

//   render() {

//     const { onRefresh, refreshing, data: { length }, ListFooterComponent } = this.props;

//     return (
//       <View>
//         <List 
//           width={600}
//           height={600}
//           rowHeight={20}
//           rowCount={length}
//           rowRenderer={this._renderRow}
//           onRowsRendered={this._onRowsRendered}
//           ref={_list => { this._list = _list; }}/>
//         <ListFooterComponent/>
//       </View>
//     );
//   }
// }


const WIDTH = 1000;

const styles = StyleSheet.create({
  centered: {
    marginHorizontal: 40,
    maxWidth: WIDTH,
    left: '50%',
    marginLeft: -WIDTH * 0.5,
  },
});

class InfList extends Component {
  
  scrollToIndex = index => {}; // this._list.scrollToRow(index);

  _isRowLoaded = ({ index }) => !!this.props.data[index];

  _renderRow = ({ index, key, style }) => {
    let content;

    if (!this._isRowLoaded({ index })) {
      content = this.props.ListFooterComponent;
    } else {
      content = <this.props.renderItem item={this.props.data[index]}/>;
    }

    return (
      <View
        key={key}
        style={[ style, Dimensions.get('window').width > WIDTH && styles.centered ]}
      >
        {content}
      </View>
    );
  };
  
  _loadMore = ({ startIndex, stopIndex }) => {
    console.log(startIndex, stopIndex);

    const { refreshing, onEndReached } = this.props;

    (refreshing ? () => {} : onEndReached)();
  }

  _rowHeight = ({ index }) => getRowHeight(this.props.data[index]);

  render() {
    const { refreshing, onEndThreshold, data } = this.props;

    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const rowCount = refreshing ? data.length + 1 : data.length;

    return (
      <AutoSizer>
        {({ width, height }) => (
          <InfiniteLoader
            isRowLoaded={this._isRowLoaded}
            loadMoreRows={this._loadMore}
            rowCount={rowCount}
            threshold={onEndThreshold}
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                rowRenderer={this._renderRow}
                rowCount={rowCount}
                rowHeight={this._rowHeight}
                width={width}
                height={height}
              />
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    );
  }
}

export default InfList;
