const initialState = {
    isLoggedIn: false
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_USER':
        return {
            username: action.username,
            token: action.token,
            isLoggedIn: true
        };
    case 'UNSET_USER':
        return initialState;
    default:
        return state;
    }
};