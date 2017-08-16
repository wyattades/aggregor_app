import React from 'react';
import { Platform, View } from 'react-native';
import { connect } from 'react-redux';

// TODO: remake prompt: styles, allow regex matching, custom buttons

let PromptView;
let prompt;

if (Platform.OS === 'web') {

  prompt = options => () => {
    // TEMP
    // eslint-disable-next-line no-alert
    let value = window.prompt(options.title);
    if (value) {
      options.onSubmit(value);
    }
  };

  PromptView = () => <View/>;

} else {

  prompt = options => dispatch => dispatch({
    type: 'SET_PROMPT',
    options,
  });

  // eslint-disable-next-line global-require
  const Prompt = require('react-native-prompt').default;

  PromptView = ({ dispatch, options: { onSubmit, onCancel, title, textInputProps = {}, ...rest } }) => {
    const handleSubmit = value => {
      onSubmit && onSubmit(value);
      dispatch({ type: 'UNSET_PROMPT' });
    };
    const handleCancel = () => {
      onCancel && onCancel();
      dispatch({ type: 'UNSET_PROMPT' });
    };

    return (
      <Prompt
        {...rest}
        title={title || ''}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        textInputProps={{ maxLength: 32, ...textInputProps }}/>
    );
  };

  PromptView = connect(state => ({
    options: state.prompt,
  }))(PromptView);

}

export { PromptView, prompt };
