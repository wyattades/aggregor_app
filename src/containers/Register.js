import React, { PropTypes } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import { createUser } from '../actions/api';
import format from '../utils/format';
import { textField, SubmitButton, FormError, FormLink } from '../components/Form';
import theme from '../utils/theme';
  
const onSubmit = (values, dispatch) => {
  return dispatch(createUser(values))
  // .then(
    // () => dispatch(init('Main')), 
    .catch(
    err => {
      console.log(err);
      if (err.code === 409) {
        throw new SubmissionError({ _error: 'Uh oh, this username is already taken!' });
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
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.PRIMARY_DARK,
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  title: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: theme.WHITE,
  },
  subtitle: {
    fontSize: 24,
    color: theme.TEXT_SECOND,
    marginBottom: -8
  }
});

const goToLogin = navigation => () => navigation.navigate('Login');

const RegisterForm = ({ handleSubmit, submitting, submitSucceeded, error, navigation }) => (
  <View style={styles.container}>
    <View>
      <Text style={[styles.title, styles.subtitle]}>Sign up</Text>
      <Text style={styles.title}>Aggregor</Text>
    </View>
    <View>
      { error ? <FormError error={error}/> : null }
      <Field label="Username" name="username" component={textField}/>
      <Field label="Email" name="email" component={textField}/>
      <Field label="Password" secureTextEntry={true} name="password" component={textField}/>
      {/*<Field label="Password" secureTextEntry={true} name="passwordConfirm" component={renderInput}/>*/}
      <SubmitButton title="SIGN UP" onPress={handleSubmit(onSubmit)} submitting={submitting} submitSucceeded={submitSucceeded}/>
    </View>
    <FormLink title="Sign in to Aggregor" onPress={goToLogin(navigation)}/>
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

export default Register;