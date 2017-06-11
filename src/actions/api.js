import { API_KEY, API_URL, LEE } from 'react-native-dotenv';

import { setFeed } from './navActions';

const ADDRESS = (LEE !== 'true' && __DEV__) ? 'http://localhost:3000' : API_URL,
			TOKEN = API_KEY;

// TODO: many actions do not handle errors correctly, allErrors doesn't catch correctly

const error = dispatch => err => {
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
	} else {
		return Promise.reject(err);
	}
};

const allErrors = dispatch => err => {
	error(dispatch)(err).catch(() => {});
};

const request = (method, route, token, data) => new Promise((resolve, reject) => {
	fetch(ADDRESS + route, {
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
			resolve(res.data);
		} else {
			throw res;
		}
	})
	.catch(err => {
		if (typeof err === 'object' && typeof err.code === 'number') {
			reject(err);
		} else {
			reject({
				code: 0,
				msg: 'Error',
				data: 'Undefined Error'
			});
		}
	});
});

export const login = data => (dispatch, getState) => request('POST', '/user/login', undefined, data).then(
	({ token }) => dispatch({ type: 'SET_USER', username: data.username, token })
);

export const logout = () => (dispatch, getState) => request('DELETE', '/user/logout', getState().user.token).then(
	() => dispatch({ type: 'UNSET_USER' }),
	allErrors(dispatch)
);

// data: username, password, first_name, last_name, email
export const createUser = data => dispatch => request('POST', '/user', undefined, data).then(
	({ token }) => 	dispatch({ type: 'SET_USER', username: data.username, token }),
	error(dispatch)
);

// data: username, password
export const deleteUser = password => (dispatch, getState) => {
	const user = getState().user;
	return request('DELETE', '/user', user.token, { username: user.username, password }).then(
		() => dispatch({ type: 'UNSET_USER' }),
		allErrors(dispatch)
	);
};

export const fetchFeeds = () => (dispatch, getState) => {
	const user = getState().user;
	return request('GET', `/user/${user.username}/feed`, user.token).then(
		({ feedNames }) => {
			dispatch({ type: 'SET_FEEDS', feedNames });
			// return Promise.resolve();
		},
		err => {
			if (err.code === 401 || err.code === 0) {
				dispatch({ type: 'UNSET_USER' });
			} else {
				allErrors(dispatch)(err);
			}
		}
	);
};

export const createFeed = feed => (dispatch, getState) => {
	const user = getState().user;
	return request('POST', `/user/${user.username}/feed`, user.token, { name: feed }).then(
		() => {
			dispatch({ type: 'ADD_FEED', feed });
			return Promise.resolve();
		},
		error(dispatch)
	);
};

export const deleteFeed = feed => (dispatch, getState) => {
	const { feeds, user } = getState();

	const first = feeds.remove(feed).first();
	dispatch(setFeed(first ? first.get('name') : null));

	return request('DELETE', `/user/${user.username}/feed/${feed}`, user.token).then(
		() => {
			dispatch({ type: 'DELETE_FEED', feed });
			return Promise.resolve();
		},
		allErrors(dispatch)
	);
};

export const fetchPlugins = feed => (dispatch, getState) => {
	const user = getState().user;
	return request('GET', `/user/${user.username}/feed/${feed}`, user.token).then(
		({ plugins }) => {
			dispatch({ type: 'SET_PLUGINS', feed, plugins });
			return Promise.resolve();
		},
		error(dispatch)
	);
};

export const fetchFeed = (feed, page = 1) => (dispatch, getState) => {
	const user = getState().user;

	if (LEE === 'true') {
		if (page === 1) {
			const entries =  require('../tests/sample-data.js').default;
			dispatch({ type: 'APPEND_ENTRIES', feed, page, entries });
		}
		return Promise.resolve();
	}

	return request('GET', `/user/${user.username}/feed/${feed}/${page}`, user.token).then(
		({ entries, errors }) => {
			dispatch({ type: 'APPEND_ENTRIES', feed, page, entries });
			dispatch({ type: 'SET_ERRORS', feed, page, errors });
		},
		error(dispatch)
	);
};

export const savePlugin = (feed, data, pluginId) => (dispatch, getState) => {
	const user = getState().user;

	if (typeof pluginId === 'string' && pluginId.length > 0) {
		return request('PUT', `/user/${user.username}/feed/${feed}/${pluginId}`, user.token, data).then(
			() => {
				dispatch({ type: 'UPDATE_PLUGIN', feed, id: pluginId, data });
				dispatch(fetchFeed(feed)).then(() => {});
				return Promise.resolve();
			}, 
			error(dispatch)
		);
	} else {
		return request('POST', `/user/${user.username}/feed/${feed}`, user.token, data).then(
			({ id }) => {
				data.id = id;
				dispatch({ type: 'ADD_PLUGIN', feed, id, data });
				dispatch(fetchFeed(feed)).then(() => {});
				return Promise.resolve();
			}, 
			error(dispatch)
		);
	}
};

export const removePlugin = (feed, id) => (dispatch, getState) => {
	const user = getState().user;
	return request('DELETE', `/user/${user.username}/feed/${feed}/${id}`, user.token).then(
		() => dispatch({ type: 'DELETE_PLUGIN', feed, id }), 
		error(dispatch)
	);
};

// fetchAvailablePlugins???

// changePassword

// fetchUserData e.g. email