import React, { PropTypes } from 'react';
import { Text, StyleSheet, View, Button, ToastAndroid } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';

import theme from '../utils/theme';
import { prompt } from '../utils/prompt';
import { deleteFeed } from '../actions/api';

export const styles = StyleSheet.create({
  webContentHeader: {
    backgroundColor: theme.WHITE,
  },
  webContentTitle: {
    color: theme.TEXT,
  },

  headerText: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.WHITE,
    marginRight: 8,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  highlight: {
    color: theme.ACCENT,
  },
});

const HeaderTitle = ({ texts }) => {
  return (
    <View style={styles.headerTextContainer}>
      {texts.map(({ title, highlight }) => (
        <Text key={title} style={[ styles.headerText, highlight ? styles.highlight : null ]}>{title}</Text>
      ))}
    </View>
  );
};

const renameFeed = (oldName, newName) => dispatch => {
  // TEMP
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

const handleRightElementPress = navigation => ({ action, index }) => {
  const selectedFeed = navigation.state.routes[0].params.selectedFeed,
        dispatch = navigation.dispatch;
  if (action === 'menu') {
    if (index === 0) {
      promptRename(selectedFeed, dispatch);
    } else if (index === 1) {
      dispatch(deleteFeed(selectedFeed))
      .then(() => {
        ToastAndroid.show('Feed succesfully deleted', ToastAndroid.SHORT);
      });
    }
  } else if (action === 'edit') {
    navigation.navigate('FeedEdit', { selectedFeed });
  }
};

const openDrawer = navigation => () => navigation.navigate('DrawerOpen');

// NOTE: navigation.goBack() doesn't work for some reason
const goBack = navigation => () => navigation.dispatch(NavigationActions.back());

export const DashboardHeader = ({ navigation, scene }) => { 
  const params = scene.route.params,
        selectedFeed = params && params.selectedFeed;
  return (
    <Toolbar
      leftElement="menu"
      onLeftElementPress={openDrawer(navigation)}
      centerElement={<HeaderTitle texts={[
        {
          title: selectedFeed || 'Home',
          highlight: !!selectedFeed
        }
      ]}/>}
      rightElement={{ 
        actions: [ 'edit' ],
        menu: {
          icon: 'more-vert',
          labels: [
            'Rename Feed',
            'Delete Feed'
          ]
        }
      }}
      onRightElementPress={handleRightElementPress(navigation)}/>
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
      ]}/>}/>
  );
};

export const PluginEditHeader = ({ navigation, scene }) => { 
  const params = scene.route.params,
        { selectedFeed, plugin } = params;
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
       ]}/>}/>
  );
};

export const MainHeader = ({ navigation, title }) => (
  <Toolbar
    leftElement="menu"
    onLeftElementPress={openDrawer(navigation)}
    centerElement={title}/>
);
