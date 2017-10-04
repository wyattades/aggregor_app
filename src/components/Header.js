import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Toolbar from './Toolbar';
import theme from '../utils/theme';
import prompt from '../utils/prompt';
import alert from '../utils/alert';
import { deleteFeed, removePlugin, updateFeed } from '../actions/api';
import { goBack, goHome, pushHome } from '../actions/navActions';

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
    {texts.map(({ title, highlight }, i) => (
      <View key={i} style={[styles.headerTextBorder, highlight ? styles.highlight : null]}>
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

const handleFeedOptionsPress = (dispatch, selectedFeed) => ({ index }) => {
  if (index === 0) {
    promptRename(selectedFeed, dispatch);
  } else if (index === 1) {
    dispatch(deleteFeed(selectedFeed))
    .then(() => {
      alert('Feed succesfully deleted');
    });
  }
};

const goToFeedEdit = (dispatch, path, selectedFeed) => () => {
  const inEditor = path.includes('/edit');
  if (inEditor) {
    dispatch(goHome(selectedFeed));
  } else {
    dispatch(pushHome(selectedFeed));
  }
};

const handleBack = dispatch => () => dispatch(goBack());

// TODO: avoid passing path
export const DashboardHeader = ({ dispatch, path, match, toggleDrawer, mobile }) => {
  const selectedFeed = match.params && match.params.selectedFeed;

  return selectedFeed ? (
    <Toolbar
      leftElement="menu"
      onLeftElementPress={toggleDrawer}
      centerElement={<HeaderTitle
        showTitle={!mobile}
        texts={[
          {
            title: selectedFeed,
            highlight: true,
          },
        ]}/>}
      rightElement="playlist-add"
      onRightElementPress={goToFeedEdit(dispatch, path, selectedFeed)}/>
  ) : (
    <MainHeader toggleDrawer={toggleDrawer} title="Home"/>
  );
};

export const FeedEditHeader = ({ dispatch, match }) => {
  const selectedFeed = match.params && match.params.selectedFeed;

  return (
    <Toolbar
      leftElement="close"
      onLeftElementPress={handleBack(dispatch)}
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
      onRightElementPress={handleFeedOptionsPress(dispatch, selectedFeed)}
      backgroundColor={theme.WHITE}
      contentColor={theme.PRIMARY_DARK}/>
  );
};

const handleDeletePlugin = (dispatch, selectedFeed, id) => () =>
  dispatch(removePlugin(selectedFeed, id))
  .then(() => {
    dispatch(goBack());
    alert('Plugin succesfully deleted');
  });

export const PluginEditHeader = ({ dispatch, match }) => {

  const params = match.params || {};
  const selectedFeed = params.selectedFeed;
  const plugin = params.plugin !== 'new' && params.plugin;

  return (
    <Toolbar
      leftElement="arrow-back"
      onLeftElementPress={handleBack(dispatch)}
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
      onRightElementPress={plugin ? handleDeletePlugin(dispatch, selectedFeed, plugin) : null}
      backgroundColor={theme.WHITE}
      contentColor={theme.PRIMARY_DARK}/>
  );
};

export const MainHeader = ({ toggleDrawer, title, mobile }) => (
  <Toolbar
    leftElement="menu"
    onLeftElementPress={toggleDrawer}
    centerElement={<HeaderTitle showTitle={!mobile} texts={[{ title }]}/>}/>
);

export const genericHeader = title => props => <MainHeader {...props} title={title}/>;
