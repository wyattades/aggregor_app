import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Toolbar from './Toolbar';
import theme from '../utils/theme';
import { prompt } from '../utils/prompt';
import alert from '../utils/alert';
import { deleteFeed, removePlugin, updateFeed } from '../actions/api';

const styles = StyleSheet.create({
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
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextBorder: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginRight: 8,
    marginTop: 2,
  },
  highlight: {
    borderBottomColor: theme.ACCENT,
  },

});

const HeaderTitle = ({ texts }) => (
  <View style={styles.headerTextContainer}>
    {texts.map(({ title, highlight }) => (
      <View key={title} style={[styles.headerTextBorder, highlight ? styles.highlight : null]}>
        <Text numberOfLines={1} style={styles.headerText}>{title}</Text>
      </View>
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
          alert('Sorry, invalid feed name');
        } else if (err.code === 409) {
          alert('Sorry, feed name already taken');
        }
      });
    }
  },
}));

const handleFeedOptionsPress = (navigation, selectedFeed) => ({ action, index }) => {
  const dispatch = navigation.dispatch;

  if (action === 'menu') {
    if (index === 0) {
      promptRename(selectedFeed, dispatch);
    } else if (index === 1) {
      dispatch(deleteFeed(selectedFeed))
      .then(() => {
        alert('Feed succesfully deleted');
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
          highlight: true,
        },
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
          highlight: true,
        },
      ] : [
        {
          title: 'Create Feed',
        },
      ]}/>}
      rightElement={{
        menu: {
          icon: 'more-vert',
          labels: [
            'Rename Feed',
            'Delete Feed',
          ],
        },
      }}
      onRightElementPress={handleFeedOptionsPress(navigation, selectedFeed)}/>
  );
};

const handleDeletePlugin = (navigation, selectedFeed, id) => () => {
  const dispatch = navigation.dispatch;
  
  dispatch(removePlugin(selectedFeed, id))
  .then(() => {
    dispatch(NavigationActions.back());
    alert('Plugin succesfully deleted');
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
          highlight: true,
        },
      ]}/>}
      rightElement={plugin ? 'delete' : undefined}
      onRightElementPress={plugin ? handleDeletePlugin(navigation, selectedFeed, plugin.id) : null}/>
  );
};

export const MainHeader = ({ navigation, title }) => (
  <Toolbar
    leftElement="menu"
    onLeftElementPress={openDrawer(navigation)}
    centerElement={<HeaderTitle texts={[{ title }]}/>}/>
);
