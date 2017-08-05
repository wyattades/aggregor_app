import React from 'react';
import Prompt from 'react-native-prompt';
import { connect } from 'react-redux';

// TODO: remake prompt: styles, allow regex matching, custom buttons

export const prompt = options => dispatch => dispatch({ type: 'SET_PROMPT', options });

let PromptView = ({ dispatch, options: { onSubmit, onCancel, title, textInputProps = {}, ...rest } }) => {
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

export { PromptView };