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

const onSubmit = (values, dispatch) =>
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
  duration: 800,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

const goToRegister = navigation => () => navigation.navigate('Register');

class Login extends Component {

  constructor(props) {
    super(props);

    const init = props.navigation.state.params && props.navigation.state.params.init;
    this.state = {
      show: !init,
      // show: true,
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
    const { handleSubmit, submitting, submitSucceeded, error, navigation } = this.props;
    let _error;
    if (error) {
      _error = error;
    } else {
      const apiError = navigation.state.params && navigation.state.params.apiError;
      if (apiError instanceof Error) {
        _error = apiError.toString();
      } else if (typeof apiError === 'object') {
        _error = apiError.data;
      }
    }

    return (
      <View style={styles.background}>
        <Container style={[ styles.container, this.state.show && { justifyContent: 'space-between' } ]} adjust={450}>
          <Text style={styles.title}>Aggregor</Text>
          { this.state.show ? (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80}>
              { _error ? <FormError error={_error}/> : null }
              <Field label="Username" name="username" component={AnimatedTextField}/>
              <Field label="Password" secureTextEntry name="password" component={AnimatedTextField}/>
              <SubmitButton
                title="SIGN IN"
                onPress={handleSubmit(onSubmit)}
                submitting={submitting}
                submitSucceeded={submitSucceeded}/>
            </KeyboardAvoidingView>
          ) : null }
          { this.state.show ? (
            <FormLink title="Sign up for Aggregor" onPress={goToRegister(navigation)}/>
          ) : null }
        </Container>
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
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
