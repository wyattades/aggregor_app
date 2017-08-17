// Created by the react-navigation team

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions, addNavigationHelpers } from 'react-navigation';

function getUri(path, params) {

  const queries = [];
  
  if (typeof params === 'object') {
    const keys = Object.keys(params);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i],
            value = params[key];

      // TODO: better way to check for built-in params?
      if (key !== 'selectedFeed' && key !== 'plugin') {
        queries.push(`${key}=${value}`);
      }
    }
  }

  const query = queries.length ? `?${queries.join('&')}` : '';
  return `#/${path}${query}`;
}

function getAction(router, path, params = {}) {

  // Get pathname from hash url
  const match = path.match(/\/*#\/*(.*?)(\?.*)?$/);
  path = match && match[1];
  if (typeof path !== 'string') {
    path = '';
  }

  const action = router.getActionForPathAndParams(path, params);

  if (action) {
    return NavigationActions.reset({
      index: 0,
      actions: [
        action,
      ],
    });
  }
  return NavigationActions.navigate({
    params: { path },
    routeName: 'NotFound',
  });
}

export default NavigationAwareView => {

  const initialAction = getAction(
    NavigationAwareView.router,
    window.location.hash, // Use hash instead of pathname because we are hash-routing
  );

  const initialState = NavigationAwareView.router.getStateForAction(initialAction);

  console.log({ initialAction, initialState });

  return class extends Component {

    static childContextTypes = {
      getActionForPathAndParams: PropTypes.func.isRequired,
      getURIForAction: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
    };

    state = initialState;

    getChildContext() {
      return {
        getActionForPathAndParams: this.getActionForPathAndParams,
        getURIForAction: this.getURIForAction,
        dispatch: this.dispatch,
      };
    }

    componentDidMount() {
      // const navigation = addNavigationHelpers({
      //   state: this.state.routes[this.state.index],
      //   dispatch: this.dispatch,
      // });
      // document.title = NavigationAwareView.router.getScreenOptions(
      //   navigation,
      // ).title;

      // TODO: don't go back to loading screen if coming from aggregor.com ???
      window.onpopstate = e => {
        e.preventDefault();

        const action = getAction(
          NavigationAwareView.router,
          window.location.hash,
        );
        if (action) this.dispatch(action);
        console.log('popstate', action);
      };

    }

    componentWillReceiveProps(nextProps) {
      this.setState(nextProps.state);
    }

    componentWillUpdate(props, state) {
      const {
        path,
        params,
      } = NavigationAwareView.router.getPathAndParamsForState(state);

      const uri = getUri(path, params);
      
      if (window.location.hash !== uri) {
        window.history.pushState({}, undefined, uri);
      }
      // const navigation = addNavigationHelpers({
      //   state: props.state.routes[props.state.index],
      //   dispatch: this.dispatch,
      // });
      // document.title = NavigationAwareView.router.getScreenOptions(
      //   navigation,
      // ).title;
    }

    // We're only using hash for hash-routing
    // componentDidUpdate() {
    //   const { params } = NavigationAwareView.router.getPathAndParamsForState(
    //     this.state,
    //   );
    //   if (params && params.hash) {
    //     document.getElementById(params.hash).scrollIntoView();
    //   }
    // }

    getActionForPathAndParams = (path, params) => NavigationAwareView.router.getActionForPathAndParams(path, params);

    getURIForAction = action => {
      const state = NavigationAwareView.router.getStateForAction(action, this.state) ||
        this.state;

      const { path } = NavigationAwareView.router.getPathAndParamsForState(state);

      return getUri(path);
    };

    dispatch = action => {
      const state = NavigationAwareView.router.getStateForAction(
        action,
        this.state,
      );

      if (!state) {
        console.log('Dispatched action did not change state: ', { action });
      } else {
        console.log('Navigation Dispatch: ', {
          action,
          newState: state,
          lastState: this.state,
        });
      }

      if (!state) {
        return true;
      }

      if (state !== this.state) {
        this.setState(state);
        return true;
      }
      return false;
    }

    render() {
      return (
        <NavigationAwareView navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.state,
        })}/>
      );
    }
  };

};
