import React, { PropTypes, Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';

import { textField, SubmitButton } from '../components/Form'; 
import { savePlugin } from '../actions/api';

// TODO

class PluginEdit extends Component {

  onSubmit = (values) => {
    const { selectedFeed, dispatch, id } = this.props;

    return dispatch(savePlugin(selectedFeed, values, id))
      .catch(err => {
        console.log('pluginErr: ', err);
        throw new SubmissionError({ _error: err.data });
      });

  };

  render() {
    const { plugin = {}, handleSubmit, error, pristine, submitting, submitSucceeded } = this.props;
    return (
      <View>
        <Text>Plugin Edit Page</Text>
        <Text>{JSON.stringify(plugin)}</Text>
        {error ? <Text>{error}</Text> : null}
        <SubmitButton 
          title="Save" 
          onPress={handleSubmit(this.onSubmit)}
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

PluginEdit = connect((state, ownProps) => ({
  ...ownProps.navigation.state.params,
  id: ownProps.plugin && ownProps.plugin.id,
}))(PluginEdit);

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