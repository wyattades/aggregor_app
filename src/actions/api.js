import { setFeed, goLogin } from './navActions';
import alert from '../utils/alert';

// TODO: many actions do not handle errors correctly, 
// TODO: set max timeout for api calls

let ADDRESS,
    TOKEN;

export const init = (url, key) => {
  ADDRESS = __DEV__ ? 'http://localhost:3000' : url;
  TOKEN = key;
};

const request = (dispatch, method, route, token, data) => fetch(ADDRESS + route, {
  method,
  headers: {
    Accept: 'json',
    'Content-Type': data && 'application/json',
    [TOKEN]: token && token,
  },
  body: data && JSON.stringify(data),
})
.then(res => res.json())
.then(res => {
  if (res.code === 200) {
    return Promise.resolve(res.data);
  } else {
    throw res;
  }
})
.catch(err => {
  if (typeof err !== 'object' || typeof err.code !== 'number') {
    const isErr = err instanceof Error;
    err = {
      code: 0,
      msg: isErr ? err.name : 'Error',
      data: isErr ? err.message : 'Undefined Error',
    };
  }

  console.log('ERROR: ', err);

  const errorType = Math.floor(err.code / 100);
  if (errorType === 5) {
    dispatch({
      type: 'UNSET_USER',
      err,
    });
  } else if (errorType === 0) {
    alert('Failed to connect to Aggregor server. Please try again later.');
  }

  throw err;
});

export const deleteUser = password => (dispatch, getState) => {
  const user = getState().user;
  return request(dispatch, 'DELETE', `/user/${user.username}`, user.token, { username: user.username, password }).then(
    () => dispatch(goLogin()),
  );
};

// data: username, email, created_on, first_name, last_name
export const fetchUser = () => (dispatch, getState) => {
  const user = getState().user;
  return request(dispatch, 'GET', `/user/${user.username}`, user.token).then(
    data => {
      dispatch({ type: 'UPDATE_USER', ...data });
      return Promise.resolve();
    },
  );
};

// data: username, email, password, first_name, last_name
export const updateUser = data => (dispatch, getState) => {
  const user = getState().user;
  return request(dispatch, 'PUT', `/user/${user.username}`, user.token, data).then(
    () => dispatch({ type: 'UPDATE_USER', ...data }),
  );
};

export const fetchFeeds = () => (dispatch, getState) => {
  const user = getState().user;
  return request(dispatch, 'GET', `/user/${user.username}/feed`, user.token).then(
    ({ feedNames }) => {
      dispatch({ type: 'SET_FEEDS', feedNames });

      return Promise.resolve(feedNames);
    },
  );
};

export const createFeed = feed => (dispatch, getState) => {
  const user = getState().user;
  return request(dispatch, 'POST', `/user/${user.username}/feed`, user.token, { name: feed }).then(
    () => {
      dispatch({ type: 'ADD_FEED', feed });
      dispatch(setFeed(feed, true));
      return Promise.resolve();
    },
  );
};

export const deleteFeed = feed => (dispatch, getState) => {
  const { feeds, user } = getState();

  const first = feeds.remove(feed).first();
  dispatch(setFeed(first ? first.get('name') : null));

  return request(dispatch, 'DELETE', `/user/${user.username}/feed/${feed}`, user.token).then(
    () => {
      dispatch({ type: 'DELETE_FEED', feed });
      return Promise.resolve();
    },
  );
};

export const fetchFeed = (feed, page = 1) => (dispatch, getState) => {
  const user = getState().user;

  return request(dispatch, 'GET', `/user/${user.username}/feed/${feed}/${page}`, user.token).then(
    ({ entries, errors }) => {
      dispatch({ type: 'APPEND_ENTRIES', feed, page, entries });
      dispatch({ type: 'SET_ERRORS', feed, page, errors });
    },
  )
  .catch(err => {
    if (err.code === 0) {
      dispatch({ type: 'SET_ERRORS', feed, page, err });
    }
  });
};

export const updateFeed = (feed, name) => (dispatch, getState) => {
  const user = getState().user;
  return request(dispatch, 'PUT', `/user/${user.username}/feed/${feed}`, user.token, { name }).then(
    () => {
      dispatch({ type: 'UPDATE_FEED', feed, name });
      dispatch(setFeed(name));
    },
  );
};

export const fetchPlugins = feed => (dispatch, getState) => {
  const user = getState().user;
  return request(dispatch, 'GET', `/user/${user.username}/feed/${feed}/plugin`, user.token).then(
    ({ plugins }) => {
      dispatch({ type: 'SET_PLUGINS', feed, plugins });
      return Promise.resolve();
    },
  );
};

export const savePlugin = (feed, data, pluginId) => (dispatch, getState) => {
  const user = getState().user;

  if (typeof pluginId === 'string' && pluginId.length > 0 && pluginId !== 'new') {
    return request(dispatch, 'PUT', `/user/${user.username}/feed/${feed}/plugin/${pluginId}`, user.token, data).then(
      () => {
        dispatch({ type: 'UPDATE_PLUGIN', feed, id: pluginId, data });
        dispatch(fetchFeed(feed)).then(() => {});
        return Promise.resolve();
      },
    );
  } else {
    return request(dispatch, 'POST', `/user/${user.username}/feed/${feed}/plugin`, user.token, data).then(
      ({ id }) => {
        data.id = id;
        dispatch({ type: 'ADD_PLUGIN', feed, id, data });
        dispatch(fetchFeed(feed)).then(() => {});
        return Promise.resolve();
      },
    );
  }
};

export const removePlugin = (feed, id) => (dispatch, getState) => {
  const user = getState().user;
  return request(dispatch, 'DELETE', `/user/${user.username}/feed/${feed}/plugin/${id}`, user.token).then(
    () => dispatch({ type: 'DELETE_PLUGIN', feed, id }),
  );
};

export const fetchAvailablePlugins = () => (dispatch) => request(dispatch, 'GET', '/plugins').then(
  ({ plugins }) => {
    // convert regex strings to RegExp
    for (let key in plugins) {
      if (plugins.hasOwnProperty(key)) {
        for (let option of plugins[key].options) {
          option.regex = new RegExp(option.regex);
        }
      }
    }

    dispatch({
      type: 'SET_PLUGIN_DATA',
      plugin_types: plugins,
      plugin_array: Object.keys(plugins).map(key => plugins[key]),
    });
  },
);

export const loadInit = (isLoggedIn, path) => dispatch =>
  dispatch(fetchAvailablePlugins())
  .then(() => isLoggedIn ?
    dispatch(fetchUser())
    .then(() => dispatch(fetchFeeds()))
    .then(feedNames => {

      let feed,
          goToEdit;

      if (path) {
        const match = path.split('/');
        match.shift();
        if (match[0] === 'feed' && match[1]) {
          feed = match[1];
          if (match[2] === 'edit') {
            goToEdit = true;
            if (match[3]) {
              goToEdit = match[3];
            }
          }
        }
      }

      if (!feed) {
        feed = (Array.isArray(feedNames) && feedNames[0]) || null;
      }

      return dispatch(setFeed(feed, goToEdit));
    })
    :
    Promise.resolve(),
  )
  .catch(err => {
    if (err.code === 401 || err.code === 0) {
      dispatch(goLogin());
    }
  });

export const login = data => dispatch => request(dispatch, 'POST', '/session', undefined, data).then(
  ({ token }) => {
    dispatch({ type: 'SET_USER', username: data.username, token });
    dispatch(loadInit(true));
  },
);

export const logout = () => (dispatch, getState) => request(dispatch, 'DELETE', '/session', getState().user.token).then(
  () => dispatch(goLogin()),
);

// data: username, password, first_name, last_name, email
export const createUser = data => dispatch => request(dispatch, 'POST', '/user', undefined, data).then(
  ({ token }) => {
    dispatch({ type: 'SET_USER', username: data.username, token });
    dispatch(loadInit(true));
  },
);
