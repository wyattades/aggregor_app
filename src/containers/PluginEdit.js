import React, { PropTypes, Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, Field } from 'redux-form';

import { textField, sliderField, SubmitButton } from '../components/Form'; 
import { savePlugin } from '../actions/api';
import { pluginRecord } from '../utils/records';

// TODO: Use selector for plugin type

const styles = StyleSheet.create({
  container: {
    padding: 24,
  }
});

class PluginEdit extends Component {

  _onSubmit = values => {
    const { selectedFeed, dispatch, id, navigation } = this.props;

    const data = {
      id,
      type: values.type,
      status: 'loading',
      error: undefined,
      data: {
        url: values.url,
        priority: values.priority,
      },
    };

    return dispatch(savePlugin(selectedFeed, data, id))
      .then(
        () => navigation.goBack(), 
        err => {
          console.log('pluginErr: ', err);
          throw new SubmissionError({ _error: err.data });
        }
      );
  };

  render() {
    const { handleSubmit, error, pristine, submitting, submitSucceeded } = this.props;
    return (
      <View style={styles.container}>
        <Field name="type" label="Type" component={textField} dark={true}/>
        <Field name="url" label="Url" component={textField} dark={true}/>
        <Field name="priority" label="Priority" min={0} max={100} step={1} component={sliderField}/>
        {error ? <Text>{error}</Text> : null}
        <SubmitButton 
          title="SAVE" 
          onPress={handleSubmit(this._onSubmit)}
          disabled={pristine}
          submitting={submitting}
          submitSucceeded={submitSucceeded}/>
      </View>
    );
  }
}

PluginEdit = reduxForm({
  form: 'pluginEdit'
})(PluginEdit);

PluginEdit = connect((state, ownProps) => {
  const { plugin = new pluginRecord({}), selectedFeed } = ownProps.navigation.state.params;
  return {
    selectedFeed,
    id: plugin.id,
    initialValues: {
      type: plugin.type,
      url: plugin.data.url || '',
      priority: plugin.data.priority === undefined ? 50 : plugin.data.priority,
    }
  };
})(PluginEdit);

PluginEdit.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        selectedFeed: PropTypes.string.isRequired,
        plugin: PropTypes.object,
      }).isRequired
    }).isRequired
  }).isRequired
};

export default PluginEdit;