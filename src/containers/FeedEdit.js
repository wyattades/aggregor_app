import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import { addPlugin, updatePlugin } from '../actions/api';
import { SubmitButton, textField } from '../components/Form';

// TODO

class FeedEdit extends Component {

  static propTypes = {
    selectedFeed: PropTypes.string
  }

  _addPlugin = () => {
    const { dispatch, selectedFeed } = this.props;
    dispatch(addPlugin(selectedFeed, { type: 'raw', data: { url: 'www.reddit.com' } })).catch(console.log);
  }

  _onSubmit = () => {
    console.log('save');
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1500);
    });
  }

  render() {
    const { plugins, handleSubmit, pristine, submitting, submitSucceeded } = this.props;
    return (
      <View>
        <Field name="feed" label="Feed name" component={textField}/>
        {plugins.map(plugin => (
          <Text key={plugin.id}>{plugin.id + ': ' + plugin.data.url}</Text>
        ))}
        <SubmitButton title="Save" disabled={pristine} onPress={handleSubmit(this._onSubmit)} submitting={submitting} submitSucceeded={submitSucceeded}/>
      </View>
    );
  }
}

FeedEdit = reduxForm({
  form: 'feedEdit'
})(FeedEdit);

FeedEdit = connect(({ feeds, selectedFeed }) => ({
  plugins: feeds.get(selectedFeed).get('plugins').toArray(),
  selectedFeed,
}))(FeedEdit);

export default FeedEdit;