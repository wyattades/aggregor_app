import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import { createUser } from '../actions/api';
import { HeaderLink } from '../components/Header';
import format from '../utils/format';
import { init } from '../actions/navActions';
import { textField, SubmitButton, FormError } from '../components/Form';
  
const onSubmit = (values, dispatch) => {
  return dispatch(createUser(values))
  .then(
    () => dispatch(init('Main')), 
    err => {
      console.log(err);
      if (err.code === 400) {
        throw new SubmissionError({ _error: err.data });
      } else if (err.code === 409) {
        throw new SubmissionError({ _error: 'Uh oh, this username is already taken!' });
      } else if (err.code === 0) {
        throw new SubmissionError({ _error: 'Failed to connect to the Aggregor server' });
      }
    }
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40
  }
});

const RegisterForm = ({ handleSubmit, submitting, error }) => (
  <View style={styles.container}>
    { error ? <FormError error={error}/> : null }
    <Field label="Username" name="username" component={textField}/>
    <Field label="Email" name="email" component={textField}/>
    <Field label="Password" secureTextEntry={true} name="password" component={textField}/>
    {/*<Field label="Password" secureTextEntry={true} name="passwordConfirm" component={renderInput}/>*/}
    <SubmitButton title="Sign Up" onPress={handleSubmit(onSubmit)} submitting={submitting}/>
  </View>
);

const Register = reduxForm({
  form: 'register',
  validate: values => {
    const errors = {},
    { username, email, password } = values;

    if (!username) {
      errors.username = 'Username is required.';
    } else {
      errors.username = format.username(username);
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else {
      errors.password = format.password(password);
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else {
      errors.email = format.email(email);
    }

    return errors;
  }
})(RegisterForm);

Register.propTypes = {
  navigation: PropTypes.object.isRequired
};

Register.navigationOptions = ({ navigation }) => ({
  title: 'Sign Up',
  headerLeft: null,
  headerRight: (
    <HeaderLink title="Sign In" onPress={() => navigation.navigate('Login') }/>
  )
});

export default Register;