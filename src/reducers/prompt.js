const initialState = {
  visible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UNSET_PROMPT':
      return initialState;
    case 'SET_PROMPT':
      return {
        ...action.options,
        visible: true,
      };
    default:
      return state;
  }
};
