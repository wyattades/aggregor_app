export const plugin_types = (state = {}, action) => {
  if (action.type === 'SET_PLUGIN_DATA') {
    return action.plugin_types;
  }
  return state;
};

export const plugin_array = (state = {}, action) => {
  if (action.type === 'SET_PLUGIN_DATA') {
    return action.plugin_array;
  }
  return state;
};