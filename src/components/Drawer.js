import React, { PropTypes } from 'react';
import { ScrollView, View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions } from 'react-navigation';

// import { setFeed } from '../actions/navActions';
import theme from '../utils/theme';
import { logout } from '../actions/api';
import { setFeed } from '../actions/navActions';

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
    color: theme.TEXT_SECOND,

  },
  iconRightWrap: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
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

const ripple = TouchableNativeFeedback.SelectableBackgroundBorderless();

const NavItem = ({ title, onPress, iconLeft, iconRight, selected, onIconPress }) => (
  <View>
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.item, selected ? styles.selectedItem : null]}>
        {iconLeft ? <Icon name={iconLeft} size={24} style={styles.iconLeft}/> : null}
        <Text style={styles.itemText} numberOfLines={1}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
    {iconRight ? (
      <TouchableNativeFeedback onPress={onIconPress} background={ripple}>
        <View style={styles.iconRightWrap}>
          <Icon name={iconRight} size={24} style={styles.iconRight}/>
        </View>
      </TouchableNativeFeedback>
    ) : null}
  </View>
);

let Drawer = ({ feeds, navigation, dispatch }) => {
  const { index, routes } = navigation.state;
  const params = routes[0].routes[routes[0].index].params;
  const selectedFeed = params && params.selectedFeed;
  const selected = routeName => (index > 0 && routes[index].routeName === routeName);

  return (
    <ScrollView style={styles.container} endFillColor="#444">
      <Billboard/>
      <Label title="My Feeds"/>
      {feeds.map(feed => (
        <NavItem title={feed} iconLeft="label" iconRight="edit" selected={index === 0 && feed === selectedFeed} key={feed} 
          onPress={() => 
            navigation.dispatch(NavigationActions.navigate({ 
              routeName: 'Dashboard', 
              params: { selectedFeed: feed }
            }))
          }
          onIconPress={()=>
            navigation.dispatch(NavigationActions.navigate({ 
              routeName: 'Dashboard', 
              params: { selectedFeed: feed }
            }))
            /*dispatch(setFeed(feed, true))*/
            /*NavigationActions.reset({
              index: 1, 
              actions: [
                NavigationActions.navigate({ routeName: 'Dashboard', params: { selectedFeed: feed } }),
                NavigationActions.navigate({ routeName: 'FeedEdit', params: { selectedFeed: feed } }),
              ]
            }))*/
          }/>
      ))}
      <NavItem title="Create new feed" iconLeft="add" selected={selected('NewFeed')} onPress={() => navigation.navigate('FeedEdit')}/>
      <View style={styles.divider}/>
      <NavItem title="Account" iconLeft="account-circle" selected={selected('Account')} onPress={() => navigation.navigate('Account')}/>
      <NavItem title="About" iconLeft="info" selected={selected('About')} onPress={() => navigation.navigate('About')}/>
      <NavItem title="Logout" iconLeft="exit-to-app" onPress={() => dispatch(logout())}/>
    </ScrollView>
  );
};

Drawer = connect(({ feeds }) => ({
  feeds: feeds.keySeq().toArray(),
}))(Drawer);

Drawer.propTypes = {
  navigation: PropTypes.object.isRequired,
  // router: PropTypes.object.isRequired,
  // renderIcon: PropTypes.func.isRequired,
  // getLabel: PropTypes.func.isRequired,
};

export default Drawer;

//TODO: map dispatch
//TODO: selected NavItem based on navigation state