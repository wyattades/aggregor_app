export default (state = {}, action) => {
    switch(action.type) {
    case 'SET_USER':
        return {
            username: action.username,
            token: action.token
        };
    case 'UNSET_USER':
        return {};
    default:
        return state;
    }
};