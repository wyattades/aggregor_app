import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createFeed, logout } from '../actions/api';
import theme from '../utils/theme';
import prompt from '../utils/prompt';
import alert from '../utils/alert';
import { feedName } from '../utils/format';
import Touchable from './Touchable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.WHITE,
  },

  divider: {
    borderTopColor: theme.SUPPORT,
    borderTopWidth: 1,
    marginVertical: 12,
  },

  labelText: {
    color: theme.TEXT_SECOND,
    fontWeight: '500',
  },
  labelView: {
    height: 40,
  },

  item: {
    height: 48,
    paddingLeft: 16,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: theme.TEXT,
    fontWeight: '500',
  },
  itemSpacer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWrap: {
    flex: 1,
    marginRight: 4,
  },
  selectedItem: {
    backgroundColor: theme.SUPPORT,
  },
  iconLeft: {
    color: theme.ACCENT,
    marginRight: 40,
  },
  iconRight: {
    color: theme.TEXT_SECOND,
    padding: 4,
  },

  billboard: {
    height: 128,
    marginTop: 32,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  billboardTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: theme.PRIMARY_DARK,
  },
  billboardSubtitle: {
    fontWeight: '500',
    color: theme.TEXT_SECOND,
  },
});

const handleCreateFeed = dispatch => feed => dispatch(createFeed(feed))
.catch(err => {
  alert(err.data);
});

const promptNewFeed = navigation => () => {
  navigation.navigate('DrawerClose');
  navigation.dispatch(prompt({
    title: 'Create New Feed',
    label: 'Name',
    submitText: 'Create',
    match: feedName,
    onSubmit: handleCreateFeed(navigation.dispatch),
  }));
};

const Billboard = () => (
  <View style={styles.billboard}>
    <Text style={styles.billboardTitle}>Aggregor</Text>
    <Text style={styles.billboardSubtitle}>Everything in one place.</Text>
  </View>
);

const Label = ({ title }) => (
  <View style={[ styles.item, styles.labelView ]}>
    <Text style={styles.labelText}>{title}</Text>
  </View>
);

const NavItem = ({ title, onPress, iconLeft, iconRight, selected, onIconPress }) => (
  <View>
    <Touchable onPress={onPress} style={[styles.item, selected ? styles.selectedItem : null]}>
      {iconLeft ? <Icon name={iconLeft} size={24} style={styles.iconLeft}/> : null}
      <View style={styles.itemSpacer}>
        <View style={styles.textWrap}>
          <Text style={styles.itemText} numberOfLines={1}>{title}</Text>
        </View>
        {iconRight ? (
          <Touchable onPress={onIconPress} feedback="uncontained">
            <Icon name={iconRight} size={24} style={styles.iconRight}/>
          </Touchable>
        ) : null}
      </View>
    </Touchable>
  </View>
);

const goToFeed = (selectedFeed, dispatch) => () => dispatch(NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Dashboard', params: { selectedFeed } }),
  ],
}));

const goToFeedEdit = (selectedFeed, dispatch) => () => dispatch(NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Dashboard', params: { selectedFeed } }),
    NavigationActions.navigate({ routeName: 'FeedEdit', params: { selectedFeed } }),
  ],
}));

const navigate = (navigation, screen) => () => navigation.navigate(screen);

const handleLogout = dispatch => () => dispatch(logout());

let Drawer = ({ feeds, navigation, dispatch }) => {
  const { index, routes } = navigation.state;
  const params = routes[0].routes[routes[0].index].params;
  const selectedFeed = params && params.selectedFeed;
  const selected = routeName => (index > 0 && routes[index].routeName === routeName);

  return (
    <ScrollView style={styles.container} endFillColor="#444">
      <Billboard/>
      <View style={styles.divider}/>
      <Label title="My Feeds"/>
      {feeds.map(feed => (
        <NavItem
          title={feed}
          iconLeft="label"
          iconRight="edit"
          selected={index === 0 && feed === selectedFeed}
          key={feed}
          onPress={goToFeed(feed, dispatch)}
          onIconPress={goToFeedEdit(feed, dispatch)}/>
      ))}
      <NavItem
        title="Create new feed"
        iconLeft="add"
        selected={selected('NewFeed')}
        onPress={promptNewFeed(navigation)}/>
      <View style={styles.divider}/>
      <NavItem
        title="Account"
        iconLeft="account-circle"
        selected={selected('Account')}
        onPress={navigate(navigation, 'Account')}/>
      <NavItem title="About" iconLeft="info" selected={selected('About')} onPress={navigate(navigation, 'About')}/>
      <NavItem title="Logout" iconLeft="exit-to-app" onPress={handleLogout(dispatch)}/>
    </ScrollView>
  );
};

// TODO: component should not be 'smart' (by using connect), only containers
Drawer = connect(({ feeds }) => ({
  feeds: feeds.keySeq().toArray(),
}))(Drawer);

Drawer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Drawer;
