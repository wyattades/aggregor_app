import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Platform,
  LayoutAnimation as NativeLayoutAnimation,
  KeyboardAvoidingView as NativeKeyboardAvoidingView } from 'react-native';
import { reduxForm, SubmissionError, Field } from 'redux-form';

import { login } from '../actions/api';
import { AnimatedTextField, SubmitButton, FormError, FormLink } from '../components/Form';
import theme from '../utils/theme';
import Container from '../components/Container';

// TEMP
const LayoutAnimation = Platform.OS === 'web' ?
  { Types: {}, Properties: {}, configureNext: () => {} } :
  NativeLayoutAnimation;

// TODO: figure out better keyboardAvoiding
const KeyboardAvoidingView = Platform.OS === 'web' ?
  ({ children }) => <View>{children}</View> :
  NativeKeyboardAvoidingView;

const onSubmit = history => (values, dispatch) =>
  dispatch(login(values))
  .catch(err => {
    if (err.code === 401) {
      throw new SubmissionError({ _error: 'Invalid username or password' });
    } else if (err.code === 0) {
      throw new SubmissionError({ _error: 'Failed to connect to the Aggregor server' });
    } else {
      throw new SubmissionError({ _error: err.data || 'An unknown error occurred. Please try again later.' });
    }
  });


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.PRIMARY_DARK,
  },
  container: {
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  title: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: theme.WHITE,
  },
});

const animation = {
  duration: 700,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

const goToRegister = history => () => history.push('/register');

class Login extends Component {

  constructor(props) {
    super(props);

    const init = false; // props.history.state.params && props.history.state.params.init;
    this.state = {
      show: !init,
    };
  }

  componentDidMount() {
    if (!this.state.show) {
      setTimeout(() => {
        LayoutAnimation.configureNext(animation);
        this.setState({
          show: true,
        });
      });
    }
  }

  render() {
    const { handleSubmit, submitting, submitSucceeded, error, history } = this.props;

    const animated = !this.state.show && {
      height: 0,
      opacity: 0,
    };

    return (
      <View style={styles.background}>
        <Container style={[ styles.container, { justifyContent: this.state.show ? 'space-between' : 'center' } ]}>
          <Text style={styles.title}>Aggregor</Text>
          <View style={animated}>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80}>
              { error ? <FormError error={error}/> : null }
              <Field label="Username" name="username" component={AnimatedTextField}/>
              <Field label="Password" secureTextEntry name="password" component={AnimatedTextField}/>
              <SubmitButton
                title="SIGN IN"
                onPress={handleSubmit(onSubmit(history))}
                submitting={submitting}
                submitSucceeded={submitSucceeded}/>
            </KeyboardAvoidingView>
          </View>
          <View style={animated}>
            <FormLink title="Sign up for Aggregor" onPress={goToRegister(history)}/>
          </View>
        </Container>
      </View>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'login',
  validate: (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = 'Username is required.';
    }

    if (!values.password) {
      errors.password = 'Password is required.';
    }

    return errors;
  },
})(Login);
