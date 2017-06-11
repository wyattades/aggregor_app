import React from 'react';
import { Text, StyleSheet, View, ToastAndroid, StatusBar } from 'react-native';
import { Toolbar as _Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';

import theme from '../utils/theme';
import { prompt } from '../utils/prompt';
import { deleteFeed, removePlugin } from '../actions/api';

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
    alignItems: 'flex-start',
  },
  highlight: {
    color: theme.ACCENT,
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

const HeaderTitle = ({ texts }) => {
  return (
    <View style={styles.headerTextContainer}>
      {texts.map(({ title, highlight }) => (
        <Text numberOfLines={1} key={title} style={[ styles.headerText, highlight ? styles.highlight : null ]}>{title}</Text>
      ))}
    </View>
  );
};

const renameFeed = (oldName, newName) => dispatch => {
  // TODO: support renaming feeds
  if (oldName !== newName) {
    ToastAndroid.show('Sorry, renaming feeds is not yet supported', ToastAndroid.LONG);
  }
};

const promptRename = (oldName, dispatch) => dispatch(prompt({
  title: 'Rename Feed',
  placeholder: 'name',
  defaultValue: oldName,
  submitText: 'Rename',
  onSubmit: newName => dispatch(renameFeed(oldName, newName))
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
