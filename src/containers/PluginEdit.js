import React, { PropTypes, Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, Field } from 'redux-form';

import { textField, SubmitButton } from '../components/Form'; 
import { savePlugin } from '../actions/api';

// TODO
// Add selector for types of plugins???

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
        url: values.url
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
        <Field name="type" label="Type" component={textField}/>
        <Field name="url" label="Url" component={textField}/>
        {error ? <Text>{error}</Text> : null}
        <SubmitButton 
          title="Save" 
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
  const { plugin = { data: {} }, selectedFeed } = ownProps.navigation.state.params;
  return {
    selectedFeed,
    id: plugin.id,
    initialValues: {
      type: plugin.type || 'raw',
      url: plugin.data.url,
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