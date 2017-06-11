import React, { PropTypes } from 'react';
import { WebView, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../utils/theme';

const styles = StyleSheet.create({
  webview: {
    // flex: 1,
    backgroundColor: theme.SUPPORT
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
    color: theme.TEXT,
  },
  loadingIcon: {
    color: theme.TEXT_SECOND,
  },
  errorIcon: {
    color: theme.ERROR
  },
});

const Loading = () => (
  <View style={styles.container}>
    <Icon name="cached" size={48} style={styles.loadingIcon}/>
  </View>
);

const LoadError = () => (
  <View style={styles.container}>
    <Icon name="error" size={48} style={styles.errorIcon}/>
  </View>
);

let WebContent = ({ source }) => (
  <WebView
    source={{ uri: source }}
    style={styles.webview}
    startInLoadingState={true}
    onLoadStart={stuff => console.log()}
    onLoadEnd={stuff => console.log()}
    renderError={LoadError}
    renderLoading={Loading}/>
);

WebContent.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        source: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

WebContent = connect((state, ownProps) => ({
  ...ownProps.navigation.state.params,
}))(WebContent);

export default WebContent;