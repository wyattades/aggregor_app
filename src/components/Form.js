import React, { PropTypes, PureComponent } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableNativeFeedback, Slider, Animated, Easing, Picker, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../utils/theme';

const styles = StyleSheet.create({
  inputGroup: {
    paddingTop: 24,
  },

  input: {
    padding: 8,
    color: theme.WHITE,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: theme.TEXT_SECOND,
  },

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
    backgroundColor: theme.SUPPORT
  },

  inputError: {
    borderColor: theme.ERROR,
  },
  errorText: {
    color: theme.ERROR,
    padding: 5,
  },
  dark: {
    color: theme.TEXT,
    borderBottomColor: theme.DIVIDER,
    borderBottomWidth: 2,
  },

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

  formLinkContainer: {
    alignSelf: 'center',
    margin: 8,
  },
  formLink: {
    color: theme.WHITE,
    fontSize: 16,
    padding: 8
  },

  slider: {
    flex: 0.9,
  },
  sliderValue: {
    paddingVertical: 6,
    flex: 0.1,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    color: theme.TEXT_SECOND,
  },
  sliderRow: {
    flexDirection: 'row',
  },

  labelView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.TEXT_SECOND,
    margin: 8,
  },
  optional: {
    fontSize: 16,
    margin: 8,
    marginLeft: 0,
    color: theme.DIVIDER,
  },

  pickerStyle: {
    marginTop: -8,
    marginBottom: 0,
  },

  plainInput: {
    backgroundColor: theme.WHITE,
    marginBottom: 8,
    borderColor: theme.SUPPORT,
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 12,
  },
  plainInputError: {
    borderColor: theme.ERROR,
  },
});

class PickerField extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      value: props.input.value
    };
  }

  _onValueChange = value => {
    this.setState({ value });
    this.props.input.onChange(value);
  }

  render () {
    const { label, values } = this.props;
    return (
      <View>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.value}
          onValueChange={this._onValueChange}>
          {values.map(val => (
            <Picker.Item key={val.value} label={val.label} value={val.value}/>
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
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

class SliderField extends PureComponent {

  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
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
      <View>
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
          <Text style={styles.sliderValue}>{value}</Text>
        </View>
      </View>
    );
  }
}

const TextField = ({ input: { onChange, ...restInput }, meta: { error, touched }, optional, label, secureTextEntry }) => {
  const inputError = error && touched;
  return (
    <View>
      {label ? (
        <View style={styles.labelView}>
          <Text style={styles.label}>{label}</Text> 
          {optional ? <Text style={styles.optional}>(optional)</Text> : null}
        </View>
      ) : null}
      <TextInput
        onChangeText={onChange}
        autoCorrect={false}
        underlineColorAndroid={'transparent'}
        style={[styles.plainInput, inputError ? styles.plainInputError : null]}
        secureTextEntry={secureTextEntry || false}
        {...restInput}/>
      {inputError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

class AnimatedTextField extends PureComponent {

  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
    secureTextEntry: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      anim: new Animated.Value(props.input.value.length > 0 ? 0 : 1)
    };
  }

  _animate = toValue => Animated.timing(
    this.state.anim,
    {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
    }
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

  render() {
    const { input: { onChange, ...restInput }, meta: { error, touched }, label, secureTextEntry } = this.props;
    const inputError = error && touched;

    const labelStyle = {
      position: 'absolute',
      transform: [{ translateY: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 24]
      }) }],
      fontSize: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 18]
      }),
    };

    return (
      <View style={styles.inputGroup}>
        { label ? <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text> : null}
        <TextInput 
          underlineColorAndroid="transparent"
          autoCorrect={false}
          style={[styles.input, inputError ? styles.inputError : null]} 
          onChangeText={this._onChangeText(onChange)} 
          secureTextEntry={secureTextEntry || false}
          {...restInput}/>
        {inputError ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  }
}

const ripple = TouchableNativeFeedback.SelectableBackground(),
  noRipple = TouchableNativeFeedback.Ripple('transparent');

const SubmitButton = ({ title, onPress, submitting, submitSucceeded, disabled, style = null }) => (
  <TouchableNativeFeedback onPress={disabled ? null : onPress} background={disabled ? noRipple : ripple}>
    <View style={[styles.button, disabled ? styles.disabled : null, style]}>
      { submitting ? <ActivityIndicator color={theme.WHITE}/> : null }
      { submitSucceeded ? <Icon name="check" color={theme.WHITE} size={24}/> : null }
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

const FormError = ({ error }) => {
  if (typeof error === 'object') {
    error = JSON.stringify(error);
  }

  return (
    <View style={styles.mainErrorView}>
      <Text style={styles.mainErrorText}>{error}</Text>
    </View>
  );
}

FormError.propTypes = {
  error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
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

export { TextField, AnimatedTextField, PickerField, SliderField, SubmitButton, FormError, FormLink };