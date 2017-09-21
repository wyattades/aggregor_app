import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Platform, KeyboardAvoidingView as NativeKeyboardAvoidingView } from 'react-native';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import { createUser } from '../actions/api';
import format from '../utils/format';
import { AnimatedTextField, SubmitButton, FormError, FormLink } from '../components/Form';
import theme from '../utils/theme';
import Container from '../components/Container';

const KeyboardAvoidingView =
  Platform.OS === 'web' ?
    ({ children }) => <View>{children}</View> :
    NativeKeyboardAvoidingView;

const onSubmit = (values, dispatch) =>
  dispatch(createUser(values))
  .catch(err => {
    if (err.code === 409) {
      throw new SubmissionError({ _error: 'Uh oh, this username is already taken!' });
    } else if (err.code === 0) {
      throw new SubmissionError({ _error: 'Failed to connect to the Aggregor server' });
    } else {
      throw new SubmissionError({ _error: err.data || 'An unknown error occurred. Please try again later.' });
    }
  });

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
  background: {
    flex: 1,
    backgroundColor: theme.PRIMARY_DARK,
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
    marginBottom: -8,
  },
});

const goToLogin = navigation => () => navigation.goBack();

const RegisterForm = ({ handleSubmit, submitting, submitSucceeded, error, navigation }) =>
  (<View style={styles.background}>
    <Container style={styles.container}>
      <View>
        <Text style={[styles.title, styles.subtitle]}>Sign up</Text>
        <Text style={styles.title}>Aggregor</Text>
      </View>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80}>
        {error ? <FormError error={error} /> : null}
        <Field label="Username" name="username" component={AnimatedTextField} />
        <Field label="Email" name="email" component={AnimatedTextField} />
        <Field label="Password" secureTextEntry name="password" component={AnimatedTextField} />
        {/* <Field label="Password" secureTextEntry={true} name="passwordConfirm" component={renderInput}/> */}
        <SubmitButton
          title="SIGN UP"
          onPress={handleSubmit(onSubmit)}
          submitting={submitting}
          submitSucceeded={submitSucceeded}
        />
      </KeyboardAvoidingView>
      <FormLink title="Sign in to Aggregor" onPress={goToLogin(navigation)} />
    </Container>
  </View>);

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
  },
})(RegisterForm);

Register.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Register;
