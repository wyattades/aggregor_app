import { API_KEY, API_URL, LEE } from 'react-native-dotenv';

const ADDRESS = (LEE !== 'true' && __DEV__) ? 'http://localhost:3000' : API_URL,
    TOKEN = API_KEY;

const error = dispatch => err => {
	console.log(err);
	const errorType = Math.floor(err.code / 100);
	if (errorType === 5) {
		dispatch({
			type: 'UNSET_USER',
			err
		});
	// } else if (err.code === 401) {
	// 	dispatch({
	// 		type: 'API_ERROR'
	// 	});
	} else {
		throw err;
	}
	// throw err;
};

const allErrors = dispatch => err => {
	console.log(err);
	dispatch({
		type: 'UNSET_USER',
		err
	});
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

// const apiGenerator = (next, type) => (...args) => {
// 	next({ 
// 		type,
// 		status: 'loading'
// 	});
// 	api(...args).then(data => next({
// 		type,
// 		status: 'success',
// 		data
// 	}), err => next({
// 		type,
// 		status: 'error',
// 		err
// 	}));
// };

// ** Example of a request generator
// const requestToStore = (type, method, route, token, data) => (dispatch, getState) => {
// 	const user = getState().user;
// 	dispatch({ type, status: 'loading' });
// 	request(method, route.replace('${user}', user.username), token ? user.token : undefined, data).then(
// 		res => dispatch({ type, status: 'success', ...res }),
// 		err => dispatch({ type, status: 'error', err })
// 	);
// };

// export const fetchPlugin = (feed, id) => requestToStore('SET_ENTRIES', 'GET', `/user/${user}/${feed}/${id}`, true);


// NOTE: actions that might return an expected error (such as long login info) do not have 'error(dispatch)'

export const login = data => (dispatch, getState) => request('POST', '/user/login', undefined, data).then(
	({ token }) => dispatch({ type: 'SET_USER', username: data.username, token })
);

export const logout = () => (dispatch, getState) => request('DELETE', '/user/logout', getState().user.token).then(
	() => dispatch({ type: 'UNSET_USER' }),
	error(dispatch)
);

// data: username, password, first_name, last_name, email
export const createUser = data => dispatch => request('POST', '/user', undefined, data).then(
	({ token }) => 	dispatch({ type: 'SET_USER', username: data.username, token }),
	error(dispatch)
);

// data: username, password
export const deleteUser = data => (dispatch, getState) => request('DELETE', '/user', getState().user.token, data).then(
	() => dispatch({ type: 'UNSET_USER' }),
	error(dispatch)
);

export const fetchFeeds = () => (dispatch, getState) => {
	const user = getState().user;
	return request('GET', `/user/${user.username}/feed`, user.token).then(
		({ feedNames }) => {
			dispatch({ type: 'SET_FEEDS', feedNames });
			// return Promise.resolve();
		},
		allErrors(dispatch)
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

// NOTE: use name or id?
export const deleteFeed = feed => (dispatch, getState) => {
	const user = getState().user;
	return request('DELETE', `/user/${user.username}/feed/${feed}`, user.token).then(
		() => dispatch({ type: 'DELETE_FEED', feed }),
		error(dispatch)
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

export const fetchPlugin = (feed, id) => (dispatch, getState) => {
	const user = getState().user;

	// TEMP
	if (LEE === 'true') {
		dispatch({ type: 'ADD_ENTRIES', feed, id, entries: [] });
		return Promise.resolve();
	}

	return request('GET', `/user/${user.username}/feed/${feed}/${id}`, user.token).then(
		({ entries }) => {
			dispatch({ type: 'ADD_ENTRIES', feed, id, entries });
			return Promise.resolve();
		}, 
		// TODO: Dont return. handle error and update redux store with error
		err => error(dispatch)(err).catch(console.log)
	);
};

export const fetchFeed = feed => (dispatch, getState) => {
	const plugins = getState().feeds.get(feed).get('plugins').toArray();
	dispatch({ type: 'CLEAR_ENTRIES', feed });
	return Promise.all(plugins.map(
		plugin => dispatch(fetchPlugin(feed, plugin.id))
	));
};

export const savePlugin = (feed, data, pluginId) => (dispatch, getState) => {
	const user = getState().user;
	if (pluginId) {
		return request('PUT', `/user/${user.username}/feed/${feed}/${pluginId}`, user.token, data).then(
			() => dispatch({ type: 'UPDATE_PLUGIN', feed, pluginId, data }), 
			error(dispatch)
		);
	} else {
		return request('POST', `/user/${user.username}/feed/${feed}`, user.token, data).then(
			({ id }) => dispatch({ type: 'ADD_PLUGIN', feed, id, data }), 
			error(dispatch)
		);
	}
};

export const removePlugin = (feed, id) => (dispatch, getState) => {
	const user = getState().user;
	return request('DELETE', `/user/${user.username}/feed/${feed}`, user.token).then(
		() => dispatch({ type: 'DELETE_PLUGIN', feed, id }), 
		error(dispatch)
	);
};

// export const fetchAvailablePlugins = name => (dispatch, getState) => {
// 	const user = getState().user;
// 	return request('DELETE', `/user/${user.username}/feed/${feed}`, user.token).then(
// 		res => dispatch({ type: 'SET_AVAILABLE-PLUGINS', name }), 
// 		err => dispatch({ type: 'API_ERROR', err })
// 	);
// };