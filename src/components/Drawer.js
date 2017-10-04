import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createFeed, logout } from '../actions/api';
import { setFeed, goMainPage } from '../actions/navActions';
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

const promptNewFeed = (dispatch) => () => {
  // history.navigate('DrawerClose');
  dispatch(prompt({
    title: 'Create New Feed',
    label: 'Name',
    submitText: 'Create',
    match: feedName,
    onSubmit: handleCreateFeed(dispatch),
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

const navigate = (dispatch, screen) => () => dispatch(goMainPage(screen));

const handleLogout = dispatch => () => dispatch(logout());

const goHome = (dispatch, feed, goToEdit) => () => dispatch(setFeed(feed, goToEdit));

class Drawer extends Component {
  
  shouldComponentUpdate(nextProps) {
    const { feeds, path } = this.props;

    return feeds !== nextProps.feeds ||
        path !== nextProps.path;
  }

  render() {
    const { feeds, path, mobile, dispatch } = this.props;

    const match = path.split('/');
    match.shift();

    const selected = name => match[0] === name;

    return (
      <ScrollView style={styles.container} endFillColor="#444">
        { mobile ? <Billboard/> : null }
        { mobile ? <View style={styles.divider}/> : null }
        <Label title="My Feeds"/>
        {feeds.map(feed => (
          <NavItem
            key={feed}
            title={feed}
            iconLeft="label"
            iconRight="edit"
            selected={selected('feed') && feed === match[1]}
            onPress={goHome(dispatch, feed)}
            onIconPress={goHome(dispatch, feed, true)}
          />
        ))}
        <NavItem
          title="Create new feed"
          iconLeft="add"
          selected={false} // match[3] === 'new'}
          onPress={promptNewFeed(dispatch)}/>
        <View style={styles.divider}/>
        <NavItem
          title="Account"
          iconLeft="account-circle"
          selected={selected('account')}
          onPress={navigate(dispatch, 'account')}/>
        <NavItem title="About" iconLeft="info" selected={selected('about')} onPress={navigate(dispatch, 'about')}/>
        <NavItem title="Logout" iconLeft="exit-to-app" onPress={handleLogout(dispatch)}/>
      </ScrollView>
    );
  }
}

Drawer = connect(({ feeds }) => ({
  feeds: feeds.keySeq().toArray(),
}))(Drawer);

Drawer.propTypes = {
  path: PropTypes.string.isRequired,
  mobile: PropTypes.any,
};

export default Drawer;
