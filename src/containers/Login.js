import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { reduxForm, SubmissionError, Field } from 'redux-form';

import { login } from '../actions/api';
import { textField, SubmitButton, FormError } from '../components/Form';
import { init } from '../actions/navActions';
  
const onSubmit = (values, dispatch) => {
  return dispatch(login(values))
  // .then(
    // () => dispatch(init('Main')),
    // ()=>{}, 
  .catch(
    err => {
      console.log(err);
      if (err.code === 401) {
        throw new SubmissionError({ _error: 'Invalid username or password' });
      } else if (err.code === 0) {
        throw new SubmissionError({ _error: 'Failed to connect to the Aggregor server' });
      } else {
        throw new SubmissionError({ _error: err.data || 'An unknown error occurred. Please try again later.' });
      }
    }
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40
  },
});

const LoginForm = ({ handleSubmit, submitting, error, navigation }) => {
  const _error = error || (navigation.state.params && navigation.state.params.error);
  return (
    <View style={styles.container}>
      {/*<Text style={}>Login</Text>*/}
      { _error ? <FormError error={_error}/> : null }
      <Field label="Username" name="username" component={textField}/>
      <Field label="Password" secureTextEntry={true} name="password" component={textField}/>
      <SubmitButton title="Sign In" onPress={handleSubmit(onSubmit)} submitting={submitting}/>
    </View>
  );
};

const Login = reduxForm({
  form: 'login',
  validate: values => {
    const errors = {};

    if (!values.username) {
      errors.username = 'Username is required.';
    }

    if (!values.password) {
      errors.password = 'Password is required.';
    }

    return errors;
  }
})(LoginForm);

Login.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Login;