import React, { Component, PropTypes } from 'react';
import { View, Text, FlatList, Button, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import { savePlugin, createFeed } from '../actions/api';
import { SubmitButton, textField } from '../components/Form';

// TODO

const renameFeed = (oldFeed, newFeed) => {
  return new Promise((resolve, reject) => {
    if (oldFeed !== newFeed) {
      reject(new SubmissionError({ feed: 'Sorry, renaming feeds is not yet supported' }));
    } else {
      resolve();
    }
  });
};

class FeedEdit extends Component {

  _onSubmit = (values) => {
    const { selectedFeed, dispatch } = this.props;
    const { feed } = values;

    if (selectedFeed) {
      return renameFeed(selectedFeed, feed);
    } else {
      return dispatch(createFeed(feed))
      .catch(err => {
        throw new SubmissionError({ 
          feed: err.code === 409 ? 'A feed with this name already exists' : 'Sorry, an unknown error occured' 
        });
      });
    }
  }

  _pluginItem = ({ item, index }) => (
    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('PluginEdit', { plugin: item, selectedFeed: this.props.selectedFeed })}>
      <View>
        <Text>{index}.</Text>
        <Text>{item.data.url}</Text>
      </View>
    </TouchableNativeFeedback>
  );

  render() {
    const { plugins, handleSubmit, pristine, submitting, submitSucceeded, navigation, selectedFeed } = this.props;
    return (
      <View>
        <Field name="feed" label="Feed name" component={textField}/>
        <SubmitButton 
          title="Save" 
          disabled={pristine} 
          onPress={handleSubmit(this._onSubmit)} 
          submitting={submitting} 
          submitSucceeded={submitSucceeded}/>
        {selectedFeed ? 
          <View>
            <Button title="Add Plugin" onPress={() => navigation.navigate('PluginEdit', { selectedFeed })}/>
            <FlatList 
              data={plugins} 
              renderItem={this._pluginItem}
              keyExtractor={item => item.id}/>
          </View> : null }
      </View>
    );
  }
}

FeedEdit = reduxForm({
  form: 'feedEdit'
})(FeedEdit);

FeedEdit = connect(({ feeds }, { navigation }) => {
  const selectedFeed = navigation.state.params && navigation.state.params.selectedFeed;
  const feed = feeds.get(selectedFeed);
  return {
    selectedFeed,
    plugins: feed ? feed.get('plugins').toArray() : [],
  };
})(FeedEdit);

FeedEdit.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        selectedFeed: PropTypes.string
      })
    })
  }),
};

export default FeedEdit;