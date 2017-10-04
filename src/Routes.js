import React, { PureComponent, Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-native';

import { loadInit } from './actions/api';

import MotionDrawer from './components/MotionDrawer';
import StaticDrawer from './components/StaticDrawer';
import Media from './components/Media';

import ErrorPage from './containers/ErrorPage';
import About from './containers/About';
import Login from './containers/Login';
import Account from './containers/Account';
import Register from './containers/Register';
import Loading from './containers/Loading';
import Dashboard, { NoFeeds } from './containers/Dashboard';
import PluginEdit from './containers/PluginEdit';
import FeedEdit from './containers/FeedEdit';

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
  },
});

class SmartRoute extends PureComponent {

  componentWillMount() {
    const { component, computedMatch: match, drawer, title } = this.props;

    this.props.updateOptions({
      header: component.header,
      drawer: drawer !== false,
      match,
      title,
    });
  }

  componentWillReceiveProps({ computedMatch: match, updateOptions }) {
    if (this.props.computedMatch.params.selectedFeed !== match.params.selectedFeed) {
      updateOptions({
        match,
      });
    }
  }
  
  render() {
    const { component: Content, isLoggedIn, auth, setOptions, mobile, ...rest } = this.props;

    // TODO: use location.state instead of query?
    return (
      <Route {...rest} render={props => (auth && !isLoggedIn) ? (
        <Redirect to={`/login?from=${encodeURIComponent(props.location.pathname)}`}/>
      ) : (
        <Content {...props} mobile={mobile}/>
      )}/>
    );
  }
}

const mobileRoutes = [
  { path: '/login', component: Login, drawer: false, title: 'Login' },
  { path: '/register', component: Register, drawer: false, title: 'Register' },
  { path: '/about', component: About, auth: true, title: 'About' },
  { path: '/account', component: Account, auth: true, title: 'Account' },
  { path: '/feed/:selectedFeed/edit/:plugin',
    component: PluginEdit,
    auth: true,
    title: params => `Edit '${params.selectedFeed}'` },
  { path: '/feed/:selectedFeed/edit',
    component: FeedEdit,
    auth: true,
    title: params => `Edit '${params.selectedFeed}'` },
  { path: '/feed/:selectedFeed', component: Dashboard, auth: true, title: params => params.selectedFeed },
  { path: '/feed', component: NoFeeds, auth: true, title: 'No Feeds' },
];

const routes = mobileRoutes.slice();
routes.splice(4, 2);

class Routes extends Component {

  state = {
    header: null,
    drawer: false,
    match: {},
    loading: true,
    // drawerOpen: false,
  }

  componentWillMount() {
    const { rehydrating, isLoggedIn, location } = this.props;

    if (!rehydrating) {
      this._loadInit(isLoggedIn, location.pathname);
    }
  }

  componentWillReceiveProps({ rehydrating, isLoggedIn, location }) {
    if (this.props.rehydrating && !rehydrating) {
      this._loadInit(isLoggedIn, location.pathname);
    }
  }

  _drawer = null;

  _loadInit = (isLoggedIn, path) => this.props.dispatch(loadInit(isLoggedIn, path))
  .then(() => {
    this.setState({
      loading: false,
    });
  })

  _updateOptions = options => this.setState(options, () => {

    if (Platform.OS === 'web') {
      const { title, match } = this.state;
      document.title = typeof title === 'function' ? title(match.params || {}) : title;
    }

    this._drawer && typeof this._drawer.close === 'function' && this._drawer.close();
  });

  _toggleDrawer = () => this._drawer && this._drawer.toggle();

  _bindDrawer = _ => { this._drawer = _; };

  render() {

    if (this.state.loading) {
      return <Loading/>;
    }

    const { isLoggedIn, location, dispatch } = this.props;
    const { header: Header, drawer, match } = this.state;

    const path = location.pathname;

    return (
      <Media query={{ maxWidth: 800 }}>
        {mobile => {

          const pageContent = (
            <Switch>
              <Redirect exact from="/" to="/feed"/>
              {(mobile ? mobileRoutes : routes).map(data => (
                <SmartRoute
                  key={data.path} {...data} isLoggedIn={isLoggedIn}
                  updateOptions={this._updateOptions} mobile={mobile}/>
              ))}
              <Route render={props => <ErrorPage {...props} err={{ code: 404 }}/>}/>
            </Switch>
          );

          return !mobile ? (
            <View style={styles.headerContainer}>
              <View style={styles.drawerContainer}>
                {pageContent}
                <StaticDrawer ref={this._bindDrawer} match={match} disabled={!drawer} path={path} mobile={mobile}/>
              </View>
              {Header ? <Header toggleDrawer={this._toggleDrawer} dispatch={dispatch}
                path={path} match={match} mobile={mobile}/> : null}
            </View>
          ) : (
            <MotionDrawer ref={this._bindDrawer} disabled={!drawer} match={match} path={path} mobile={mobile}>
              <View style={styles.headerContainer}>
                {pageContent}
                {Header ? <Header toggleDrawer={this._toggleDrawer} dispatch={dispatch}
                  path={path} match={match} mobile={mobile}/> : null}
              </View>
            </MotionDrawer>
          );
        }}
      </Media>
    );
  }
}

export default withRouter(connect(({ user: { isLoggedIn }, rehydrating }) => ({
  isLoggedIn,
  rehydrating,
}))(Routes));
