import React from 'react';
import { Text, StyleSheet, View, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Toolbar from './Toolbar';
import theme from '../utils/theme';
import prompt from '../utils/prompt';
import alert from '../utils/alert';
import { deleteFeed, removePlugin, updateFeed } from '../actions/api';

const styles = StyleSheet.create({
  editorHeader: {
    backgroundColor: theme.WHITE,
  },
  editorTitle: {
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
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: 'bold',
    marginRight: 20,
  },


});

const HeaderTitle = ({ texts, color = theme.WHITE, showTitle }) => (
  <View style={styles.headerTextContainer}>
    { showTitle ? <Text style={[ styles.title, { color } ]}>Aggregor</Text> : null }
    {texts.map(({ title, highlight }) => (
      <View key={title} style={[styles.headerTextBorder, highlight ? styles.highlight : null]}>
        <Text numberOfLines={1} style={[styles.headerText, { color }]}>{title}</Text>
      </View>
    ))}
  </View>
);

const promptRename = (oldName, dispatch) => dispatch(prompt({
  title: 'Rename Feed',
  label: 'Name',
  defaultValue: oldName,
  submitText: 'Rename',
  onSubmit: newName => {
    if (oldName !== newName) {
      return dispatch(updateFeed(oldName, newName))
      .catch(err => {
        if (err.code === 400) {
          alert('Sorry, invalid feed name');
        } else if (err.code === 409) {
          alert('Sorry, feed name already taken');
        }
        throw err;
      });
    }
    return Promise.resolve();
  },
}));

const handleFeedOptionsPress = (navigation, selectedFeed) => ({ index }) => {
  const dispatch = navigation.dispatch;

  if (index === 0) {
    promptRename(selectedFeed, dispatch);
  } else if (index === 1) {
    dispatch(deleteFeed(selectedFeed))
    .then(() => {
      alert('Feed succesfully deleted');
    });
  }
};

const goToFeedEdit = (navigation, selectedFeed) => () => navigation.navigate('FeedEdit', { selectedFeed });

const openDrawer = navigation => () => navigation.navigate('DrawerToggle');

// NOTE: navigation.goBack() doesn't work for some reason
const goBack = navigation => () => navigation.dispatch(NavigationActions.back());

export const DashboardHeader = ({ navigation, scene }) => {
  const params = scene.route.params,
        selectedFeed = params && params.selectedFeed;

  return selectedFeed ? (
    <Toolbar
      leftElement="menu"
      onLeftElementPress={openDrawer(navigation)}
      centerElement={<HeaderTitle
        showTitle={Platform.OS === 'web'}
        texts={[
          {
            title: selectedFeed,
            highlight: true,
          },
        ]}/>}
      rightElement="playlist-add"
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
      centerElement={<HeaderTitle
        color={theme.PRIMARY_DARK}
        texts={selectedFeed ? [
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
      rightElement={[ 'edit', 'delete' ]}
      onRightElementPress={handleFeedOptionsPress(navigation, selectedFeed)}
      backgroundColor={theme.WHITE}
      contentColor={theme.PRIMARY_DARK}/>
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
        plugin = params && params.plugin !== 'new' && params.plugin;

  return (
    <Toolbar
      leftElement="arrow-back"
      onLeftElementPress={goBack(navigation)}
      centerElement={<HeaderTitle
        color={theme.PRIMARY_DARK}
        texts={[
          {
            title: plugin ? 'Edit Plugin in' : 'Add Plugin to',
          }, {
            title: selectedFeed,
            highlight: true,
          },
        ]}/>}
      rightElement={plugin ? 'delete' : undefined}
      onRightElementPress={plugin ? handleDeletePlugin(navigation, selectedFeed, plugin) : null}
      backgroundColor={theme.WHITE}
      contentColor={theme.PRIMARY_DARK}/>
  );
};

export const MainHeader = ({ navigation, title }) => (
  <Toolbar
    leftElement="menu"
    onLeftElementPress={openDrawer(navigation)}
    centerElement={<HeaderTitle showTitle={Platform.OS === 'web'} texts={[{ title }]}/>}/>
);

export const genericHeader = title => ({ navigation }) => <MainHeader navigation={navigation} title={title}/>;
