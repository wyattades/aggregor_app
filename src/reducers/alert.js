const initialState = {
  visible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UNSET_ALERT':
      return initialState;
    case 'SET_ALERT':
      return {
        msg: action.msg,
        visible: true,
      };
    default:
      return state;
  }
};
