import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, StyleSheet, Animated, ActivityIndicator, Easing, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Touchable from './Touchable';
import Picker from './Picker';
import Slider from './Slider';
import theme from '../utils/theme';

const styles = StyleSheet.create({

  // Input group
  inputGroup: {
    marginBottom: 8,
  },

  // Animated and plain textinput error
  inputError: {
    borderColor: theme.ERROR,
  },

  // Animated textinput
  input: {
    padding: 8,
    color: theme.WHITE,
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: theme.TEXT_SECOND,
  },
  inputFocused: {
    borderBottomColor: theme.WHITE,
  },

  // Button
  button: {
    marginTop: 32,
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
  disabled: {
    backgroundColor: theme.SUPPORT,
  },

  // Error text
  errorText: {
    color: theme.ERROR,
    padding: 5,
  },

  // Main error
  mainErrorText: {
    color: theme.ERROR,
    textAlign: 'center',
    fontSize: 18,
  },
  mainErrorView: {
    padding: 12,
    borderWidth: 1,
    borderColor: theme.ERROR,
    marginVertical: 16,
  },

  // Plain link
  formLinkContainer: {
    alignSelf: 'center',
    margin: 8,
  },
  formLink: {
    color: theme.WHITE,
    fontSize: 16,
    padding: 8,
  },

  // Slider
  slider: {
    flex: 1,
  },
  sliderValue: {
    paddingHorizontal: 12,
    fontWeight: Platform.OS === 'web' ? 'bold' : '500',
    fontSize: 16,
    color: theme.TEXT_SECOND,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Label
  labelView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.TEXT_SECOND,
    padding: 8,
  },
  optional: {
    fontSize: 16,
    padding: 8,
    paddingLeft: 0,
    color: theme.DIVIDER,
  },

  // Plain textinput
  plainInput: {
    backgroundColor: theme.WHITE,
    borderColor: theme.SUPPORT,
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 12,
  },
  plainInputFocused: {
    borderColor: theme.PRIMARY,
  },
});

const __BLANK__ = '\u00a0';

class PickerField extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      value: props.input.value,
    };
  }

  _onValueChange = (value) => {
    this.setState({ value });
    this.props.input.onChange(value);
  }

  render() {
    const { label, values } = this.props;

    return (
      <View style={styles.inputGroup}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.value}
          onValueChange={this._onValueChange}
        >
          {values.map(val => (
            <Picker.Item key={val.type} label={val.label} value={val.type}/>
          ))}
        </Picker>
      </View>
    );
  }
}

PickerField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

class SliderField extends PureComponent {

  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.input.value,
    };
  }

  _onValueChange = value => this.props.input.onChange(Math.round(value * 10) / 10);

  render() {
    const { input: { value }, label, min, max, step } = this.props;
    return (
      <View style={styles.inputGroup}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <View style={styles.sliderRow}>
          <Slider
            value={this.state.value}
            minimumValue={min}
            maximumValue={max}
            minimumTrackTintColor={theme.TEXT_SECOND}
            maximumTrackTintColor={theme.PRIMARY}
            thumbTintColor={theme.PRIMARY}
            step={step}
            style={styles.slider}
            onValueChange={this._onValueChange}/>
          <Text style={styles.sliderValue}>{parseFloat(value).toFixed(1)}</Text>
        </View>
      </View>
    );
  }
}

class TextField extends PureComponent {

  state = {
    focused: false,
  }

  _onBlur = onBlur => () => {
    this.setState({ focused: false });
    onBlur();
  }

  _onFocus = onFocus => () => {
    this.setState({ focused: true });
    onFocus();
  }

  render() {
    const {
      input: { onChange, onBlur, onFocus, ...restInput },
      meta: { error, touched }, optional, label, secureTextEntry,
    } = this.props;
    
    const inputError = error && touched;

    return (
      <View style={styles.inputGroup}>
        {label ? (
          <View style={styles.labelView}>
            <Text style={styles.label}>{label}</Text>
            {optional ? <Text style={styles.optional}>(optional)</Text> : null}
          </View>
        ) : null}
        <TextInput
          onBlur={this._onBlur(onBlur)}
          onFocus={this._onFocus(onFocus)}
          onChangeText={onChange}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          style={[ styles.plainInput, this.state.focused && styles.plainInputFocused, inputError && styles.inputError ]}
          secureTextEntry={secureTextEntry || false}
          {...restInput}/>
        {inputError ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  }
}

const easing = Easing.out(Easing.ease);

class AnimatedTextField extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      anim: new Animated.Value(props.input.value.length > 0 ? 0 : 1),
      focused: false,
    };
  }

  // Adjust animation when browser autocompletes
  // componentDidMount(prevProps) {
  //   if (prevProps.input.value.length === 0 && this.props.input.value.length > 0) {
  //     this._animate(0);
  //   }
  // }

  _animate = toValue => Animated.timing(
    this.state.anim,
    {
      toValue,
      duration: 300,
      easing,
    },
  ).start();

  _onChangeText = onChange => value => {

    if (this.props.label) {
      const oldLength = this.props.input.value.length,
            newLength = value.length;

      if (newLength === 0 && oldLength > 0) {
        this._animate(1);
      } else if (newLength > 0 && oldLength === 0) {
        this._animate(0);
      }
    }

    onChange(value);
  }

  _onBlur = onBlur => () => {
    this.setState({ focused: false });
    onBlur();
  }

  _onFocus = onFocus => () => {
    this.setState({ focused: true });
    onFocus();
  }

  render() {
    const {
      input: { onChange, onBlur, onFocus, ...restInput },
      meta: { error, touched },
      label,
      secureTextEntry,
    } = this.props;

    const inputError = error && touched;

    const labelStyle = {
      position: 'absolute',
      transform: [{ translateY: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, 0],
      }) }],
      fontSize: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 18],
      }),
    };

    return (
      <View style={[ styles.inputGroup, { marginTop: 14 /* Make space for position:absolute label */ } ]}>
        { label ? <Animated.Text pointerEvents="none" style={[styles.label, labelStyle]}>{label}</Animated.Text> : null}
        <TextInput
          onBlur={this._onBlur(onBlur)}
          onFocus={this._onFocus(onFocus)}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          style={[styles.input, inputError && styles.inputError, this.state.focused && styles.inputFocused ]}
          onChangeText={this._onChangeText(onChange)}
          secureTextEntry={secureTextEntry || false}
          {...restInput}/>
        <ErrorText error={error} inputError={inputError}/>
      </View>
    );
  }
}

AnimatedTextField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  secureTextEntry: PropTypes.any,
};

const ErrorText = Platform.OS === 'web' ?
  ({ error, inputError }) => (
    <Text style={styles.errorText}>{inputError ? error : __BLANK__}</Text>
  ) :
  ({ error, inputError }) => (
    inputError ? <Text style={styles.errorText}>{error}</Text> : null
  );

const SubmitButton = ({ title, onPress, submitting, submitSucceeded, disabled, style = null }) => (
  <Touchable style={[styles.button, disabled && styles.disabled, style]} onPress={disabled ? null : onPress}>
    { submitting ? <ActivityIndicator color={theme.WHITE}/> : null }
    { submitSucceeded ? <Icon name="check" color={theme.WHITE} size={24}/> : null }
    <Text style={styles.buttonText}>{title}</Text>
  </Touchable>
);

SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool,
  submitting: PropTypes.any,
  disabled: PropTypes.bool,
};

const FormError = ({ error }) => {
  if (typeof error === 'object') {
    error = JSON.stringify(error);
  }

  return (
    <View style={styles.mainErrorView}>
      <Text style={styles.mainErrorText}>{error}</Text>
    </View>
  );
};

FormError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

const FormLink = ({ title, onPress }) => (
  <Touchable onPress={onPress} style={styles.formLinkContainer}>
    <Text style={styles.formLink}>{title}</Text>
  </Touchable>
);

FormLink.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export { TextField, AnimatedTextField, PickerField, SliderField, SubmitButton, FormError, FormLink };
