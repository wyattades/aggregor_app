import React, { PropTypes } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../utils/theme';

const styles = StyleSheet.create({
  inputGroup: {
    // marginHorizontal: 15
    marginBottom: 16,
  },
  input: {
    padding: 8,
    color: theme.WHITE,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: theme.TEXT_SECOND,
    // backgroundColor: theme.WHITE,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  label: {
    fontWeight: 'bold',
    padding: 10,
    color: theme.WHITE,
  },

  button: {
    marginVertical: 16,
    backgroundColor: theme.ACCENT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
  },
  buttonText: {
    fontSize: 16,
    padding: 12,
    color: theme.WHITE,
    fontWeight: '500',
  },
  buttonIcon: {
    color: theme.WHITE
  },
  disabled: {
    backgroundColor: theme.SUPPORT
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
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  mainErrorView: {
    padding: 12,
    borderWidth: 1,
    borderColor: theme.ERROR,
    marginVertical: 16,
  },

  formLinkContainer: {
    alignSelf: 'center',
    // marginBottom: 40,
  },
  formLink: {
    color: theme.WHITE,
    // fontWeight: '500',
    fontSize: 16,
  }
});

const textField = ({ input: { onChange, ...restInput }, meta: { error, touched }, label, secureTextEntry, style = null, inputStyle = null }) => {
  const inputError = error && touched;
  return (
    <View style={[styles.inputGroup, style]}>
      {/*{ label ? <Text style={styles.label}>{label}</Text> : null }*/}
      <TextInput 
        underlineColorAndroid="transparent"
        autoCorrect={false}
        style={[styles.input, inputError ? styles.inputError : null, inputStyle]} 
        placeholderTextColor={theme.TEXT_SECOND}
        onChangeText={onChange} 
        placeholder={label}
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

const ripple = TouchableNativeFeedback.SelectableBackground(),
  noRipple = TouchableNativeFeedback.Ripple('transparent');

const SubmitButton = ({ title, onPress, submitting, submitSucceeded, disabled, style = null }) => (
  <TouchableNativeFeedback onPress={disabled ? null : onPress} background={disabled ? noRipple : ripple}>
    <View style={[styles.button, disabled ? styles.disabled : null, style]}>
      { (submitting || submitSucceeded) ? <Icon name={submitSucceeded ? 'check' : 'cached'} style={styles.buttonIcon} size={24}/> : null }
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  </TouchableNativeFeedback>
);

SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool,
  submitting: PropTypes.any,
  disabled: PropTypes.bool
};

const FormError = ({ error }) => (
  <View style={styles.mainErrorView}>
    <Text style={styles.mainErrorText}>{error}</Text>
  </View>
);

FormError.propTypes = {
  error: PropTypes.string.isRequired
};

const FormLink = ({ title, onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.formLinkContainer}>
      <Text style={styles.formLink}>{title}</Text>
    </View>
  </TouchableNativeFeedback>
);

FormLink.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export { textField, SubmitButton, FormError, FormLink };