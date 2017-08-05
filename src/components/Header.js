import React from 'react';
import { Text, StyleSheet, View, ToastAndroid, StatusBar } from 'react-native';
import { Toolbar as _Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';

import theme from '../utils/theme';
import { prompt } from '../utils/prompt';
import { deleteFeed, removePlugin, updateFeed } from '../actions/api';

export const styles = StyleSheet.create({
  webContentHeader: {
    backgroundColor: theme.WHITE,
  },
  webContentTitle: {
    color: theme.TEXT,
  },

  headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.WHITE,
    marginRight: 8,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlight: {
    // color: theme.ACCENT,
    borderBottomColor: theme.ACCENT,
    borderBottomWidth: 2,
  },

  statusBar: {
    height: StatusBar.currentHeight,
    backgroundColor: theme.PRIMARY_DARK,
  },

});

const Toolbar = props => (
  <View>
    <View style={styles.statusBar}/>
    <_Toolbar {...props}/>
  </View>
);

const HeaderTitle = ({ texts }) => (
  <View style={styles.headerTextContainer}>
    {texts.map(({ title, highlight }) => (
      <Text numberOfLines={1} key={title} style={[ styles.headerText, highlight ? styles.highlight : null ]}>{title}</Text>
    ))}
  </View>
);

const promptRename = (oldName, dispatch) => dispatch(prompt({
  title: 'Rename Feed',
  placeholder: 'name',
  defaultValue: oldName,
  submitText: 'Rename',
  onSubmit: newName => {
    if (oldName !== newName) {
      dispatch(updateFeed(oldName, newName))
      .catch(err => {
        if (err.code === 400) {
          ToastAndroid.show('Sorry, invalid feed name', ToastAndroid.SHORT);
        } else if (err.code === 409) {
          ToastAndroid.show('Sorry, feed name already taken', ToastAndroid.SHORT);
        }
      });
    }
  }
}));

const handleFeedOptionsPress = (navigation, selectedFeed) => ({ action, index }) => {
  const dispatch = navigation.dispatch;

  if (action === 'menu') {
    if (index === 0) {
      promptRename(selectedFeed, dispatch);
    } else if (index === 1) {
      dispatch(deleteFeed(selectedFeed))
      .then(() => {
        ToastAndroid.show('Feed succesfully deleted', ToastAndroid.SHORT);
      }, err => console.log(err));
    }
  }
};

const goToFeedEdit = (navigation, selectedFeed) => () => navigation.navigate('FeedEdit', { selectedFeed });

const openDrawer = navigation => () => navigation.navigate('DrawerOpen');

// NOTE: navigation.goBack() doesn't work for some reason
const goBack = navigation => () => navigation.dispatch(NavigationActions.back());

export const DashboardHeader = ({ navigation, scene }) => { 
  const params = scene.route.params,
        selectedFeed = params && params.selectedFeed;
  return selectedFeed ? (
    <Toolbar
      leftElement="menu"
      onLeftElementPress={openDrawer(navigation)}
      centerElement={<HeaderTitle texts={[
        {
          title: selectedFeed,
          highlight: true
        }
      ]}/>}
      rightElement="edit"
      onRightElementPress={goToFeedEdit(navigation, selectedFeed)}/>
  ) : (
    <MainHeader navigation={navigation} title="Home"/>
  );
};

export const FeedEditHeader = ({ navigation, scene }) => { 
  const params = scene.route.params,
        selectedFeed = params && params.selectedFeed;

  return (
    <Toolbar
      leftElement={selectedFeed ? 'arrow-back' : 'close'}
      onLeftElementPress={goBack(navigation)}
      centerElement={<HeaderTitle texts={selectedFeed ? [
        {
          title: 'Edit',
        }, {
          title: selectedFeed,
          highlight: true
        }
      ] : [
        {
          title: 'Create Feed'
        }
      ]}/>}
      rightElement={{ 
        menu: {
          icon: 'more-vert',
          labels: [
            'Rename Feed',
            'Delete Feed'
          ]
        }
      }}
      onRightElementPress={handleFeedOptionsPress(navigation, selectedFeed)}/>
  );
};

const handleDeletePlugin = (navigation, selectedFeed, id) => () => {
  const dispatch = navigation.dispatch;
  
  dispatch(removePlugin(selectedFeed, id))
  .then(() => {
    dispatch(NavigationActions.back());
    ToastAndroid.show('Plugin succesfully deleted', ToastAndroid.SHORT);
  });
};

export const PluginEditHeader = ({ navigation, scene }) => { 
  const params = scene.route.params,
        selectedFeed = params && params.selectedFeed,
        plugin = params && params.plugin;

  return (
    <Toolbar
      leftElement="arrow-back"
      onLeftElementPress={goBack(navigation)}
      centerElement={<HeaderTitle texts={[
        {
          title: plugin ? 'Edit Plugin in' : 'Add Plugin to',
        }, {
          title: selectedFeed,
          highlight: true
        }
       ]}/>}
       rightElement={plugin ? 'delete' : undefined}
       onRightElementPress={plugin ? handleDeletePlugin(navigation, selectedFeed, plugin.id) : null}/>
  );
};

export const MainHeader = ({ navigation, title }) => (
  <Toolbar
    leftElement="menu"
    onLeftElementPress={openDrawer(navigation)}
    centerElement={title}/>
);
