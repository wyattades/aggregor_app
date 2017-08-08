import React, { Component } from 'react';
import { ListView, RefreshControl } from 'react-native';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

// approximate item height
const ITEM_HEIGHT = 300;

class FlatList extends Component {

  scrollToIndex = index => this._list.scrollTo({ x: index })

  _renderRow = (rowData) => (
    <this.props.renderItem item={rowData}/>
  )

  render() {
    const { onRefresh, refreshing, data, ListFooterComponent, onEndReached, onEndThreshold } = this.props;

    const dataSource = ds.cloneWithRows(data);

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this._renderRow}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderFooter={ListFooterComponent}
        enableEmptySections
        renderSectionHeader={() => null}
        initialListSize={15}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndThreshold * ITEM_HEIGHT}
        ref={_list => { this._list = _list; }}/>
    );
  }
}

export default FlatList;
