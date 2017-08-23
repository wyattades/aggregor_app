import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { TextField, SubmitButton } from '../components/Form';
import theme from './theme';

export default options => dispatch => dispatch({
  type: 'SET_PROMPT',
  options,
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',

  },
  prompt: {
    backgroundColor: theme.WHITE,
    width: 300,
    height: 250,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: theme.TEXT,
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    alignSelf: 'stretch',
  },
  button: {
    alignSelf: 'stretch',
    marginTop: -20,
  },
});

// TODO: initial value isn't working. Need to reset form???

class Prompt extends Component {
  
  _onSubmit = ({ input }) =>
    this.props.prompt.onSubmit(input)
    .then(() => {
      this.props.dispatch({ type: 'UNSET_PROMPT' });
      this.props.reset();
    });

  render() {
    const { prompt: { submitText = 'Submit', title, label },
      handleSubmit, pristine, submitting, submitSucceeded, dispatch } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => dispatch({ type: 'UNSET_PROMPT' })}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.prompt}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.input}>
                <Field label={label} name="input" component={TextField}/>
              </View>
              <View style={styles.button}>
                <SubmitButton
                  title={submitText}
                  disabled={pristine}
                  onPress={handleSubmit(this._onSubmit)}
                  submitting={submitting}
                  submitSucceeded={submitSucceeded}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Prompt = reduxForm({
  form: 'prompt',
  fields: [ 'input' ],
  validate: ({ input }, { prompt: { match, label = 'input' } }) => {
    const errors = {};

    if (typeof match === 'function' && !match(input)) {
      errors.input = `Invalid ${label}`;
    }

    return errors;
  },
})(Prompt);

let PromptView = ({ prompt, initialValues }) => !prompt.visible ? null : (
  <Prompt prompt={prompt} initialValues={initialValues}/>
);

PromptView.propTypes = {
  prompt: PropTypes.oneOfType([
    PropTypes.shape({
      visible: PropTypes.oneOf([ true ]).isRequired,
      match: PropTypes.function,
      label: PropTypes.string,
      title: PropTypes.string.isRequired,
      submitText: PropTypes.string,
      defaultValue: PropTypes.string,
    }).isRequired,
    PropTypes.shape({
      visible: PropTypes.oneOf([ false ]).isRequired,
    }).isRequired,
  ]).isRequired,
};

PromptView = connect(({ prompt }) => ({
  prompt,
  initialValues: {
    input: prompt.defaultValue,
  },
}))(PromptView);

export { PromptView };
