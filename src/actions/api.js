import { API_KEY, API_URL } from 'react-native-dotenv';

import { setFeed } from './navActions';

const ADDRESS = __DEV__ ? 'http://localhost:3000' : API_URL,
			TOKEN = API_KEY;

// TODO: many actions do not handle errors correctly, fix

const request = (dispatch, method, route, token, data) => fetch(ADDRESS + route, {
	method,
	headers: {
		'Accept': 'json',
		'Content-Type': data ? 'application/json' : undefined,
		[TOKEN]: token ? token : undefined,
	},
	body: data ? JSON.stringify(data) : undefined
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
			data: isErr ? err.message : 'Undefined Error'
		};
	}

	console.log('ERROR: ', err);

	const errorType = Math.floor(err.code / 100);
	if (errorType === 5) {
		dispatch({
			type: 'UNSET_USER',
			err
		});
	} else if (errorType === 0) {
		dispatch({
			type: 'NETWORK_ERROR',
			err
		});
	} 

	throw err;
});

export const login = data => (dispatch, getState) => request(dispatch, 'POST', '/session', undefined, data).then(
	({ token }) => dispatch({ type: 'SET_USER', username: data.username, token })
);

export const logout = () => (dispatch, getState) => request(dispatch, 'DELETE', '/session', getState().user.token).then(
	() => dispatch({ type: 'UNSET_USER' }),
);

// data: username, password, first_name, last_name, email
export const createUser = data => dispatch => request(dispatch, 'POST', '/user', undefined, data).then(
	({ token }) => 	dispatch({ type: 'SET_USER', username: data.username, token }),
);

export const deleteUser = password => (dispatch, getState) => {
	const user = getState().user;
	return request(dispatch, 'DELETE', `/user/${user.username}`, user.token, { username: user.username, password }).then(
		() => dispatch({ type: 'UNSET_USER' }),
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
			return Promise.resolve();
		},
	);
};

export const createFeed = feed => (dispatch, getState) => {
	const user = getState().user;
	return request(dispatch, 'POST', `/user/${user.username}/feed`, user.token, { name: feed }).then(
		() => {
			dispatch({ type: 'ADD_FEED', feed });
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
	);
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

	if (typeof pluginId === 'string' && pluginId.length > 0) {
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

export const fetchAvailablePlugins = () => (dispatch, getState) => request(dispatch, 'GET', '/plugins').then(
	({ plugins }) => {
		// convert regex strings to RegExp
		for (let key in plugins) {
			if (plugins.hasOwnProperty(key)) {
				for (let option of plugins[key].options) {
					option.regex = new RegExp(option.regex);
				}
			}
		}

		dispatch({ type: 'SET_PLUGIN_DATA', plugin_types: plugins, plugin_array: Object.keys(plugins).map(key => plugins[key]) });
		// return Promise.resolve();
	},
);