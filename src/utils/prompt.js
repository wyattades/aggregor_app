import React from 'react';
import Prompt from 'react-native-prompt';
import { connect } from 'react-redux';

export const prompt = options => dispatch => dispatch({ type: 'SET_PROMPT', options });

let PromptView = ({ dispatch, options: { onSubmit = () => {}, onCancel = () => {}, title = '', ...rest } }) => {
  const handleSubmit = value => {
    onSubmit(value);
    dispatch({ type: 'UNSET_PROMPT' });
  };
  const handleCancel = () => {
    onCancel();
    dispatch({ type: 'UNSET_PROMPT' });
  };

  return (
    <Prompt 
      {...rest} 
      title={title}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      textInputProps={{ maxLength: 32 }}/>
  );
};

PromptView = connect(state => ({
  options: state.prompt,
}))(PromptView);

export { PromptView };