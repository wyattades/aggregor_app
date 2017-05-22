import { Record, OrderedMap, List } from 'immutable';

// TODO: flatten reducers, ew

// Records ----------------------------------------------------
const feedRecord = Record({
	id: '',
	name: '',
	default: false,
	plugins: OrderedMap(),
	entries: List(),
});

const pluginRecord = Record({
	id: '',
	type: '',
	data: {
		url: '',
		priority: 0
	}
});

const entryRecord = Record({
	id: '',
	title: '',
	author: '',
	priority: 0,
	rating: 0,
	date: '',
	commentURL: '',
	authorURL: '',
	feedId: '',
	feed: '',
	feedURL: '',
	feedPriority: 0,
	category: '',
	categoryURL: '',
	thumbnailURL: '',
	commentAmount: 0,
	mediaType: '',
	imageURL: '',
	votable: ''
});

// Reducers ---------------------------------------------------
const entries = (state, action) => {
	switch (action.type) {
	case 'ADD_ENTRIES':
		return state.concat(action.entries.map(_entry => new entryRecord(_entry)))
			.sortBy(entry => entry.rating * entry.feedPriority);
	case 'UPDATE_PLUGIN':
		return state.sortBy(entry => entry.rating * entry.feedPriority);
	case 'DELETE_PLUGIN':
		return state.filter(entry => entry.feedId !== action.id);
	case 'SET_PLUGINS':
	case 'CLEAR_ENTRIES':
		return List();
	default:
		return state;
	}
};

const plugin = (state, action) => {
	switch (action.type) {
	case 'ADD_PLUGIN':
		return new pluginRecord(action);
	case 'UPDATE_PLUGIN':
		return state.merge(Map(action));
		// return new pluginRecord(action);
	default:
		return state;
	}
};

const plugins = (state, action) => {
	switch (action.type) {
	case 'SET_PLUGINS':
		return OrderedMap(action.plugins.map(
			_plugin => [_plugin.id, new pluginRecord(_plugin)])
		);
	case 'ADD_PLUGIN':
		return state.concat({ [action.id]: plugin(undefined, action) });
	case 'UPDATE_PLUGIN':
		return state.update(action.id, _plugin => plugin(_plugin, action));
	case 'DELETE_PLUGIN':
		return state.remove(action.id);
	default:
		return state;
	}
};

const feed = (state, action) => {
	switch (action.type) {
	case 'SET_FEED_DEFAULT':
		return state.set('default', state.get('name') === action.feed);
	case 'SET_PLUGINS':
	case 'ADD_PLUGIN':
	case 'UPDATE_PLUGIN':
	case 'DELETE_PLUGIN':
		return state.update('plugins', _plugins => plugins(_plugins, action))
			.update('entries', _entries => entries(_entries, action));
	case 'ADD_ENTRIES':
	case 'CLEAR_ENTRIES':
		return state.update('entries', _entries => entries(_entries, action));
	default:
		return state;
	}
};

const feeds = (state = OrderedMap(), action) => {
	switch (action.type) {
	case 'ADD_FEED':
		return state.concat({ [action.feed]: new feedRecord({ name: action.feed }) });
	case 'SET_FEED_DEFAULT':
		return state.map(_feed => feed(_feed, action));
	case 'SET_PLUGINS':
	case 'ADD_PLUGIN':
	case 'UPDATE_PLUGIN':
	case 'DELETE_PLUGIN':
	case 'ADD_ENTRIES':
	case 'CLEAR_ENTRIES':
		return state.update(action.feed, _feed => feed(_feed, action));
	case 'DELETE_FEED':
		return state.remove(action.feed);
	case 'SET_FEEDS':
		return OrderedMap(action.feedNames.map(
			name => [name, new feedRecord({ name })]
		));
	case 'UNSET_USER':
		return OrderedMap();
	default:
		return state;
	}
};

export default feeds;