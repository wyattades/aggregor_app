import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Dashboard from '../containers/Dashboard.js'; // eslint-disable-line import/extensions

const styles = StyleSheet.create({
  editor: {

  },
});

export default class extends Component {

  state = {

  };

  render() {
    const { navigation } = this.props;

    const editorIsOpen = true;

    return (
      <View>
        <Dashboard navigation={navigation}/>
        { editorIsOpen ? (
          <View style={styles.editor}>
            { editorView }
          </View>
        ) : null}
      </View>
    );

  }
}
