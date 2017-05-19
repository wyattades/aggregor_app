import React, { PropTypes } from 'react';
import { ScrollView, View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { NavigationActions } from 'react-navigation';

import { setFeed } from '../actions/navActions';
import theme from '../utils/theme';
import { logout } from '../actions/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.WHITE
  },
  divider: {
    borderTopColor: theme.SUPPORT,
    borderTopWidth: 1,
    marginVertical: 12
  },
  labelText: {
    color: theme.TEXT_SECOND,
    fontWeight: '500'
  },
  labelView: {
    height: 40
  },
  item: {
    height: 48,
    alignItems: 'center',
    paddingLeft: 16,
    flexDirection: 'row',
  },
  selectedItem: {
    backgroundColor: theme.SUPPORT
  },
  iconLeft: {
    color: theme.ACCENT,
    marginRight: 40,
  },
  iconRight: {
    color: theme.SUPPORT,
  },
  itemText: { // FIXME: text should have dynamic width, but still truncate
    color: theme.TEXT,
    fontWeight: '500',
    maxWidth: 200,
  },
  billboard: {
    height: 128,
    borderBottomWidth: 1,
    borderBottomColor: theme.SUPPORT,
    marginBottom: 16,
    backgroundColor: theme.PRIMARY_DARK,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  billboardTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: theme.WHITE,
  },
  billboardSubtitle: {
    // fontWeight: '500',
    color: theme.PRIMARY,
  },
});

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

const NavItem = ({ title, onPress, iconLeft, iconRight, selected }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={[styles.item, selected ? styles.selectedItem : null]}>
      {iconLeft ? <Icon name={iconLeft} size={24} style={styles.iconLeft}/> : null}
      <Text style={styles.itemText} numberOfLines={1}>{title}</Text>
      {iconRight ? <Icon name={iconRight} size={24} style={styles.iconRight}/> : null}
    </View>
  </TouchableNativeFeedback>  
);

const handleLogout = (dispatch) => () => dispatch(logout());

const Drawer = ({ feeds, dispatch, navigation, selectedFeed }) => {
  const { index, routes } = navigation.state;
  const selected = (routeName) => (index > 0 && routes[index].routeName === routeName);

  return (
    <ScrollView style={styles.container} endFillColor="#444">
      <Billboard/>
      <Label title="My Feeds"/>
      {feeds.map((feed) => (
        <NavItem title={feed} iconLeft="label" selected={index === 0 && feed === selectedFeed} key={feed} onPress={() => {
          dispatch(setFeed(feed));
          navigation.navigate('Home');
        }}/>
      ))}
      <NavItem title="Create new feed" iconLeft="add" selected={selected('NewFeed')} onPress={() => navigation.navigate('NewFeed')}/>
      <View style={styles.divider}/>
      <NavItem title="Account" iconLeft="account-circle" selected={selected('Account')} onPress={() => {navigation.navigate('Account');}}/>
      <NavItem title="About" iconLeft="info" selected={selected('About')} onPress={() => {navigation.navigate('About');}}/>
      <NavItem title="Logout" iconLeft="exit-to-app" onPress={handleLogout(dispatch)}/>
    </ScrollView>
  );
};


Drawer.propTypes = {
  feeds: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  renderIcon: PropTypes.func.isRequired,
  getLabel: PropTypes.func.isRequired,
  selectedFeed: PropTypes.string
};

export default connect(({ feeds, selectedFeed }) => ({
  feeds: feeds.keySeq().toArray(),
  selectedFeed
}))(Drawer);

//TODO: map dispatch
//TODO: selected NavItem based on navigation state