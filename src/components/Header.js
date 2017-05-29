import React, { PropTypes } from 'react';
import {  StyleSheet, View, Button, ToastAndroid } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';

import theme from '../utils/theme';
import { prompt } from '../utils/prompt';
import { deleteFeed } from '../actions/api';

// TODO: change header titles for Home headers i.e. make look pretty and intuitive

export const styles = StyleSheet.create({
  headerLink: {
    marginHorizontal: 10,
  },
  headerLinkText: {
    color: theme.PRIMARY,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: theme.PRIMARY_DARK,
  },
  title: {
    color: theme.WHITE
  },
  icon: {
    marginHorizontal: 16,
    color: theme.WHITE,
  },
  webContentHeader: {
    backgroundColor: theme.WHITE,
  },
  webContentTitle: {
    color: theme.TEXT,
  },
});

/*const HeaderLink = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.headerLink}>
    <Text style={styles.headerLinkText}>{title}</Text>
  </TouchableOpacity>
);*/

// TODO: button or link style?
export const HeaderLink = ({ onPress, title }) => (
  <View style={styles.headerLink}>
    <Button onPress={onPress} color={theme.ACCENT} title={title}/>
  </View>
);

HeaderLink.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

/*const ripple = TouchableNativeFeedback.SelectableBackgroundBorderless();

export const HeaderButton = ({ onPress, icon }) => (
  <TouchableNativeFeedback background={ripple} onPress={onPress}>
    <View>
      <Icon name={icon} style={styles.icon} size={24}/>
    </View>
  </TouchableNativeFeedback>
);

HeaderButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};*/

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
      centerElement={'Home' + (selectedFeed ? `: "${selectedFeed}"` : '')}
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
      centerElement={selectedFeed ? `Edit "${selectedFeed}"` : 'Create Feed'}/>
  );
};

export const PluginEditHeader = ({ navigation, scene }) => { 
  const params = scene.route.params,
        { selectedFeed, plugin } = params;
  return (
    <Toolbar
      leftElement="arrow-back"
      onLeftElementPress={goBack(navigation)}
      centerElement={(plugin ? 'Edit Plugin in "' : 'Add Plugin to "') + selectedFeed + '"'}/>
  );
};

export const MainHeader = ({ navigation, title }) => (
  <Toolbar
    leftElement="menu"
    onLeftElementPress={openDrawer(navigation)}
    centerElement={title}/>
);
