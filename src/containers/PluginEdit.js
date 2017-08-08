import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, Field, FormSection, formValueSelector } from 'redux-form';

import { PickerField, TextField, SliderField, SubmitButton, FormError } from '../components/Form';
import { PluginEditHeader } from '../components/Header';
import { savePlugin } from '../actions/api';
import { PluginRecord } from '../utils/records';

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});

class PluginEdit extends Component {
  _onSubmit = values => {
    const { selectedFeed, dispatch, id, navigation } = this.props;

    const keys = Object.keys(values.data);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i],
            value = values.data[key];
      if (typeof value === 'string' && value.length === 0) {
        delete values.data[key];
      }
    }

    return dispatch(savePlugin(selectedFeed, values, id)).then(
      () => navigation.goBack(),
      err => {
        console.log('pluginErr: ', err);
        throw new SubmissionError({ _error: err.data });
      },
    );
  };

  render() {
    const { handleSubmit, error, pristine, newPlugin, submitting, submitSucceeded, plg, plugin_array } = this.props;
    const pluginOptions = plg ? plg.options : [];

    return (
      <View style={styles.container}>
        {error ? <FormError error={error} /> : null}
        <Field name="type" label="Type" values={plugin_array} component={PickerField} />
        <FormSection name="data">
          <View>
            {pluginOptions.map(option =>
              (<Field
                key={option.key}
                name={option.key}
                label={option.label}
                optional={option.default !== undefined}
                component={TextField}
              />),
            )}
          </View>
        </FormSection>
        <Field name="priority" label="Priority" min={0.0} max={1.0} step={0.1} component={SliderField} />
        <SubmitButton
          title="SAVE"
          disabled={pristine && !newPlugin}
          onPress={handleSubmit(this._onSubmit)}
          submitting={submitting}
          submitSucceeded={submitSucceeded}
        />
      </View>
    );
  }
}

PluginEdit = reduxForm({
  form: 'pluginEdit',
  validate: (values, props) => {
    const errors = {};

    if (!props.plg) {
      errors._error = `Bad plugin type: ${values.type}`;
      return errors;
    }

    const options = props.plg.options;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const value = values.data[option.key];
      if (option.default === undefined && (value === undefined || value.length === 0)) {
        errors[option.key] = `${option.label} is required`;
      } else if (typeof value === 'string' && value.length > 0 && !value.match(option.regex)) {
        errors[option.key] = `Invalid ${option.label}`;
      }
    }

    return { data: errors };
  },
})(PluginEdit);

const selector = formValueSelector('pluginEdit');

PluginEdit = connect((state, ownProps) => {
  let { plugin, selectedFeed } = ownProps.navigation.state.params;
  const id = plugin && plugin.id;

  let newPlugin;
  if (!plugin) {
    plugin = new PluginRecord({});
    newPlugin = true;
  }

  const type = selector(state, 'type') || plugin.type;
  const plg = state.plugin_types[type];

  const pluginOptions = plg.options;

  const data = {};
  for (let i = 0; i < pluginOptions.length; i++) {
    const option = pluginOptions[i];
    data[option.key] = plugin.data[option.key] || option.default;
  }

  return {
    id,
    selectedFeed,
    newPlugin,
    plg,
    plugin_array: state.plugin_array,
    initialValues: {
      type: plugin.type,
      priority: plugin.priority,
      data,
    },
  };
})(PluginEdit);

PluginEdit.navigationOptions = {
  header: PluginEditHeader,
};

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
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default PluginEdit;
