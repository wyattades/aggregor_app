import { API_KEY, API_URL } from 'react-native-dotenv';

const ADDRESS = __DEV__ ? 'http://localhost:3000' : API_URL,
    TOKEN = API_KEY;

const error = dispatch => err => {
	const errorType = Math.floor(err.code / 100);
	if (errorType === 5) {
		console.log(err);
		dispatch({
			type: 'API_ERROR',
			err
		});
	} else {
		throw err;
	}
	// throw err;
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
	({ token }) => 	dispatch({ type: 'SET_USER', username: data.username, token })
);

// data: username, password
export const deleteUser = data => (dispatch, getState) => request('DELETE', '/user', getState().user.token, data).then(
	() => dispatch({ type: 'UNSET_USER' }),
	error(dispatch)
);

export const fetchFeeds = () => (dispatch, getState) => {
	const user = getState().user;
	// dispatch({ type: 'SET_FEEDS', status: 'loading' });
	return request('GET', `/user/${user.username}/feed`, user.token).then(
		({ feedNames }) => {
			dispatch({ type: 'SET_FEEDS', status: 'SUCCESS', feedNames });
			// return Promise.resolve();
		},
		error(dispatch)
		// dispatch({ type: 'SET_FEEDS', status: 'ERROR', err });
	);
};

export const createFeed = feed => (dispatch, getState) => {
	const user = getState().user;
	return request('POST', `/user/${user.username}/feed`, user.token, { name: feed }).then(
		() => {
			dispatch({ type: 'ADD_FEED', feed });
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
	// dispatch({ type: 'ADD_ENTRIES', status: 'loading', feed, id });
	return request('GET', `/user/${user.username}/feed/${feed}/${id}`, user.token).then(
		({ entries }) => {
			dispatch({ type: 'ADD_ENTRIES', status: 'success', feed, id, entries });
			return Promise.resolve();
		}, 
		err => {
			// dispatch({ type: 'ADD_ENTRIES', status: 'error', err });
			return error(dispatch)(err);
		}
	);
};

export const addPlugin = (feed, data) => (dispatch, getState) => {
	const user = getState().user;
	return request('POST', `/user/${user.username}/feed/${feed}`, user.token, data).then(
		({ id }) => dispatch({ type: 'ADD_PLUGIN', feed, id, data }), 
		error(dispatch)
	);
};

export const updatePlugin = (feed, id, data) => (dispatch, getState) => {
	const user = getState().user;
	return request('PUT', `/user/${user.username}/feed/${feed}/${id}`, user.token, data).then(
		() => dispatch({ type: 'UPDATE_PLUGIN', feed, id, data }), 
		error(dispatch)
	);
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