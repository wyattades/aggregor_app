import React, { Component, PropTypes } from 'react';
import { BackHandler } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation/src/react-navigation';
import { connect } from 'react-redux';
import AppNavigator from '../navigator';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('backPress', () => {
      this.props.dispatch(NavigationActions.back());
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const { dispatch, nav } = this.props;
    return <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />;
  }
}

export default connect(
  state => ({
    nav: state.nav
  })
)(App);
