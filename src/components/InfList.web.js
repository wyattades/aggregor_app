import React, { Component } from 'react';
import { View } from 'react-native'; // or can i just use div cause its a web.js file?

import { List, InfiniteLoader, AutoSizer } from 'react-virtualized';
// import 'react-virtualized/styles.css';
import { getRowHeight } from './Entry';

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

class InfList extends Component {

  scrollToIndex = index => {}

  _isRowLoaded = ({ index }) => !!this.props.data[index];// !this.props.hasNextPage || index < this.props.data.length;

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
        style={style}
      >
        {content}
      </View>
    );
  };

  _rowHeight = ({ index }) => getRowHeight(this.props.data[index]);

  _loadMore = ({ startIndex, stopIndex }) => this.props.onEndReached();

  render() {
    const { refreshing, onEndReached, data } = this.props;

    const hasNextPage = false;

    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const rowCount = hasNextPage ? data.length + 1 : data.length;

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
    const loadMoreRows = refreshing ? () => {} : onEndReached;

    return (
      <AutoSizer>
        {({ width, height }) => (
          <InfiniteLoader
            isRowLoaded={this._isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
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