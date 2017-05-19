import React, { PropTypes } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../utils/theme';

const styles = StyleSheet.create({
  inputGroup: {
    // marginHorizontal: 15,
  },
  input: {
    padding: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: theme.DIVIDER,
  },
  label: {
    fontWeight: 'bold',
    padding: 10,
  },

  button: {
    marginTop: 25,
    backgroundColor: theme.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { // unused
    fontSize: 18,
    padding: 15,
    color: theme.WHITE
  },
  buttonIcon: {
    color: theme.WHITE
  },

  inputError: {
    borderColor: theme.ERROR,
  },
  errorText: {
    color: theme.ERROR,
    paddingTop: 5,
    paddingLeft: 5,
  },

  mainErrorText: {
    color: theme.ERROR,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  mainErrorView: {
    padding: 12,
    borderWidth: 1,
    borderColor: theme.ERROR,
  },
});

const textField = ({ input: { onChange, ...restInput }, meta: { error, touched }, label, secureTextEntry }) => {
  const inputError = error && touched;
  return (
    <View style={styles.inputGroup}>
      { label ? <Text style={styles.label}>{label}</Text> : null }
      <TextInput 
        underlineColorAndroid="transparent"
        style={[styles.input, inputError ? styles.inputError : null]} 
        onChangeText={onChange} 
        secureTextEntry={secureTextEntry || false}
        {...restInput}/>
      { inputError ? <Text style={styles.errorText}>{error}</Text> : null }
    </View>
  );
};

textField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

const SubmitButton = ({ title, onPress, submitting }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.button}>
      { submitting ? <Icon name="cached" style={styles.buttonIcon} size={24}/> : null }
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </TouchableNativeFeedback>
);

SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  submitting: PropTypes.any
};

const FormError = ({ error }) => (
  <View style={styles.mainErrorView}>
    <Text style={styles.mainErrorText}>{error}</Text>
  </View>
);

FormError.propTypes = {
  error: PropTypes.string.isRequired
};

export { textField, SubmitButton, FormError };