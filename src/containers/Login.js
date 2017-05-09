import React, { Component, PropTypes } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { Label, Button, Form, FormGroup, ActionsContainer, FieldsContainer, Fieldset } from 'react-native-clean-form';
// import { Input, Select, Switch } from 'react-native-clean-form/redux-form-immutable'
import { reduxForm, Field } from 'redux-form';
// import { connect } from 'react-redux';
// import { NavigationActons } from 'react-navigation';

import { login } from '../actions/api';
import formStyles from '../styles/form';
import styles from '../styles/general';
  
const onSubmit = (values, dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(values);
      resolve();
    }, 1500);
  });
  // dispatch(login({
  //   username: 'wades',
  //   password: 'password123'
  // }))
  // .catch(err => {

  // });
};

const renderInput = ({ input: { onChange, ...restInput }, meta: { error, submitFailed }, label }) => (
  <View style={formStyles.inputGroup}>
    { label ? <Text style={formStyles.label}>{label}</Text> : null }
    <TextInput 
      underlineColorAndroid="transparent"
      style={formStyles.input} 
      onChangeText={onChange} 
      {...restInput}/>
    <Text style={[formStyles.error, (error && submitFailed) ? null : styles.hidden]}>{error}</Text>
  </View>
);

class Login extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    title: 'Login'
  };

  render() {

    const { handleSubmit, submitting } = this.props;

    return (
      <View style={styles.container}>
        <View style={formStyles.form}>
          <Field label="Username" name="username" component={renderInput}/>
          <Field label="Password" secureTextEntry={true} name="password" component={renderInput}/>
          <TouchableOpacity style={formStyles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={formStyles.buttonText}>Login</Text>
            { submitting ? <Text>Loading</Text> : null }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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