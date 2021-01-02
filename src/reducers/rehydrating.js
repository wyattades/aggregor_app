import { REHYDRATE } from 'redux-persist';

const initialState = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return false;
    default:
      return state;
  }
};
