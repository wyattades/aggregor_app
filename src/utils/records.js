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
	id: '',
	type: 'reddit',
	error: undefined,
	priority: 0.5,
	data: {}
});

export const entryRecord = Record({
	id: '',
	title: '',
	author: '',
	link: '',
	date: 0,
	commentURL: '',
	authorURL: '',
	pluginId: '',
	plugin: '',
	pluginURL: '',
	categoryURL: '',
	category: '',
	thumbnailURL: '',
	commentAmount: 0,
	mediaType: '',
	imageURL: '',
});