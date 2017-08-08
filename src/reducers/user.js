const initialState = {
  isLoggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
    case 'UPDATE_USER':
      const newUser = { ...action };
      delete newUser.type;
      newUser.isLoggedIn = true;
      return Object.assign({}, state, newUser);
    case 'UNSET_USER':
      return initialState;
    default:
      return state;
  }
};
