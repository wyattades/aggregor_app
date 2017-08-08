import { Record, OrderedMap, List } from 'immutable';

export const FeedRecord = Record({
  id: '',
  name: '',
  default: false,
  plugins: OrderedMap(),
  entries: List(),
});

export const PluginRecord = Record({
  id: '',
  type: 'reddit',
  error: undefined,
  priority: 0.5,
  data: {},
});

export const EntryRecord = Record({
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
