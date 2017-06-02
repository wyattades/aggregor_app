import { Record, OrderedMap, List } from 'immutable';

export const feedRecord = Record({
	id: '',
	name: '',
	default: false,
	plugins: OrderedMap(),
	entries: List(),
});

// TODO: move priority outside data (because its a required value)
export const pluginRecord = Record({
	id: undefined,
	type: 'raw',
	status: 'loading',
	error: undefined,
	data: {
		url: '',
		priority: 50
	}
});

export const entryRecord = Record({
	id: '',
	title: '',
	author: '',
	link: '',
	priority: 0,
	rating: 0,
	date: '',
	commentURL: '',
	authorURL: '',
	pluginId: '',
	plugin: '',
	pluginURL: '',
	pluginPriority: 0,
	category: '',
	categoryURL: '',
	thumbnailURL: '',
	commentAmount: 0,
	mediaType: '',
	imageURL: '',
	votable: ''
});