import React, { PropTypes } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Button, 
  // FormInput, FormLabel, FormValidationMessage 
} from 'react-native-elements';

import formStyles from '../styles/form';

const textField = ({ input: { onChange, ...restInput }, meta: { error, touched }, label, secureTextEntry }) => {
  const inputError = error && touched;
  return (
    <View style={formStyles.inputGroup}>
      { label ? <Text style={formStyles.label}>{label}</Text> : null }
      <TextInput 
        underlineColorAndroid="transparent"
        style={[formStyles.input, inputError ? formStyles.inputError : null]} 
        onChangeText={onChange} 
        secureTextEntry={secureTextEntry || false}
        {...restInput}/>
      { inputError ? <Text style={formStyles.errorText}>{error}</Text> : null }
    </View>
  );
};

/*const textField = ({ input: { onChange, ...restInput }, meta: { error, touched }, label, secureTextEntry }) => {
  const inputError = error && touched;
  return (
    <View style={formStyles.inputGroup}>
      { label ? <FormLabel>{label}</FormLabel> : null }
      <FormInput 
        style={[formStyles.input, inputError ? formStyles.inputError : null]}
        onChangeText={onChange} 
        secureTextEntry={secureTextEntry || false}
        {...restInput}/>
      { inputError ? <FormValidationMessage>{error}</FormValidationMessage> : null }
    </View>
  );
};*/

textField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

/*const SubmitButton = ({ title, onPress, submitting }) => (
  <TouchableOpacity style={formStyles.button} onPress={onPress}>
    <Text style={formStyles.buttonText}>{title}</Text>
    { submitting ? <Text>Signing in...</Text> : null }
  </TouchableOpacity>
);*/

const SubmitButton = ({ title, onPress, submitting }) => (
  <Button title={title} onPress={onPress} large buttonStyle={formStyles.button} icon={ submitting ? {
    name: 'cached'
  } : null }/>
);

SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  submitting: PropTypes.any
};

const FormError = ({ error }) => (
  <View style={formStyles.mainErrorView}>
    <Text style={formStyles.mainErrorText}>{error}</Text>
  </View>
);

FormError.propTypes = {
  error: PropTypes.string.isRequired
};

export { textField, SubmitButton, FormError };