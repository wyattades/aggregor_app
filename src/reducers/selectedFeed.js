const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_FEED':
        return action.feed;
    case 'UNSET_FEED':
        return initialState;
    default:
        return state;
    }
};