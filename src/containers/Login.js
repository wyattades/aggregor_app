import React, { PropTypes, Component } from 'react';
import { Text, View, StyleSheet, LayoutAnimation, KeyboardAvoidingView } from 'react-native';
import { reduxForm, SubmissionError, Field } from 'redux-form';

import { login } from '../actions/api';
import { textField, SubmitButton, FormError, FormLink } from '../components/Form';
import theme from '../utils/theme';
// import { init } from '../actions/navActions';
  
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
    flex: 1,
    justifyContent: 'center',
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
});

const animation = {
    duration: 500,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
      // springDamping: 0.7,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      // springDamping: 0.7,
    },
  };

const goToRegister = navigation => () => navigation.navigate('Register');

class Login extends Component {

  constructor(props) {
    super(props);

    const init = props.navigation.state.params && props.navigation.state.params.init;
    this.state = {
      show: !init,
    };
  }

  componentDidMount() {
    if (!this.state.show) {
      setTimeout(() => {
        LayoutAnimation.configureNext(animation);
        this.setState({
          show: true
        });
      }, 500);
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
      <View behavior="position" style={[styles.container, this.state.show ? { justifyContent: 'space-between' } : null]}>
        <Text style={styles.title}>Aggregor</Text>
        { this.state.show ? (
          <View>
            { _error ? <FormError error={_error}/> : null }
            <Field label="Username" name="username" component={textField}/>
            <Field label="Password" secureTextEntry={true} name="password" component={textField}/>
            <SubmitButton title="SIGN IN" onPress={handleSubmit(onSubmit)} submitting={submitting} submitSucceeded={submitSucceeded}/>
          </View>
         ) : null }
        { this.state.show ? (
          <FormLink title="Sign up for Aggregor" onPress={goToRegister(navigation)}/>
         ) : null }
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
  apiError: PropTypes.object
};

export default reduxForm({
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
})(Login);