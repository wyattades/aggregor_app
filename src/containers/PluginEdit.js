import React, { PropTypes, Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, Field, FormSection, formValueSelector } from 'redux-form';

import { PickerField, TextField, SliderField, SubmitButton } from '../components/Form'; 
import { savePlugin } from '../actions/api';
import { pluginRecord } from '../utils/records';
import { plugins } from '../utils/plugins';

const styles = StyleSheet.create({
  container: {
    padding: 24,
  }
});

const pluginTypes = Object.keys(plugins).map(key => plugins[key]);

class PluginEdit extends Component {

  _onSubmit = values => {
    const { selectedFeed, dispatch, id, navigation } = this.props;

    console.log(values);

    return dispatch(savePlugin(selectedFeed, values, id))
      .then(
        () => navigation.goBack(), 
        err => {
          console.log('pluginErr: ', err);
          throw new SubmissionError({ _error: err.data });
        }
      );
  };

  render() {
    const { handleSubmit, error, pristine, newPlugin, submitting, submitSucceeded, type } = this.props;
    const plg = plugins[type];
    const pluginOptions = plg ? plg.options : [];

    return (
      <View style={styles.container}>
        <Field name="type" label="Type" values={pluginTypes} component={PickerField}/>
        <FormSection name="data">
          <View>
            {pluginOptions.map(option => (
              <Field key={option.value} name={option.value} label={option.label} dark={true} component={TextField}/>
            ))}
          </View>
        </FormSection>
        <Field name="priority" label="Priority" min={0.0} max={1.0} step={0.1} component={SliderField}/>
        {error ? <Text>{error}</Text> : null}
        <SubmitButton 
          title="SAVE" 
          disabled={pristine && !newPlugin}
          onPress={handleSubmit(this._onSubmit)}
          submitting={submitting}
          submitSucceeded={submitSucceeded}/>
      </View>
    );
  }
}

PluginEdit = reduxForm({
  form: 'pluginEdit',
  validate: (values, props) => {
    let errors = {};

    const plg = plugins[values.type];

    if (!plg) {
      errors.type = 'Bad plugin type: ' + values.type;
      return errors;
    }

    const options = plg.options;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const value = values.data[option.value];
      if (value === undefined) {
        errors._error = 'Missing value: ' + option.value;
        return errors;
      } else if (value.length === 0 && option.default) {
        errors[option.value] = option.label + ' is required';
      } else if (value.length > 0) {
        if (!value.match(option.regex)) {
          errors[option.value] = 'Invalid ' + option.label;
        }
      }
    }

    return { data: errors };
  }
})(PluginEdit);

const selector = formValueSelector('pluginEdit');

PluginEdit = connect((state, ownProps) => {
  let { plugin, selectedFeed } = ownProps.navigation.state.params;

  let newPlugin;
  if (!plugin) {
    plugin = new pluginRecord({});
    newPlugin = true;
  }

  const pluginOptions = plugins[plugin.type].options;

  let data = {};
  for (let i = 0; i < pluginOptions.length; i++) {
    const option = pluginOptions[i];
    data[option.value] = plugin.data[option.value] || option.default;
  }

  return {
    selectedFeed,
    type: selector(state, 'type'),
    newPlugin,
    initialValues: {
      type: plugin.type,
      priority: plugin.priority,
      data
    },
  };
})(PluginEdit);

PluginEdit.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        selectedFeed: PropTypes.string.isRequired,
        plugin: PropTypes.shape({
          id: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          priority: PropTypes.number.isRequired,
          data: PropTypes.object.isRequired,
        }),
      }).isRequired
    }).isRequired
  }).isRequired
};

export default PluginEdit;