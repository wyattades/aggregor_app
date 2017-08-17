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

class PromptView extends Component {
  
  _onSubmit = ({ input }) =>
    this.props.options.onSubmit(input)
    .then(() => {
      this.props.dispatch({ type: 'UNSET_PROMPT' });
      this.props.reset();
    });

  render() {
    const { options: { submitText, title, visible, placeholder },
      handleSubmit, pristine, submitting, submitSucceeded, dispatch } = this.props;

    return !visible ? null : (
      <TouchableWithoutFeedback onPress={() => dispatch({ type: 'UNSET_PROMPT' })}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.prompt}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.input}>
                <Field label={placeholder} name="input" component={TextField}/>
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

PromptView = reduxForm({
  form: 'prompt',
  validate: ({ input }, { options: { match, placeholder } }) => {
    const errors = {};

    if (typeof match === 'function' && !match(input)) {
      errors.input = `Invalid ${placeholder}`;
    }

    return errors;
  },
})(PromptView);

PromptView.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.shape({
      visible: PropTypes.oneOf([ true ]).isRequired,
    }).isRequired,
    PropTypes.shape({
      visible: PropTypes.oneOf([ false ]).isRequired,
    }).isRequired,
  ]).isRequired,
};

PromptView = connect(({ prompt: options }) => ({
  options,
}))(PromptView);

export { PromptView };
