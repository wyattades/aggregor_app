import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import theme from './theme';

export const plugins = {
  'reddit': {
    value: 'reddit',
    label: 'Reddit',
    getLabel: ({ data: { subreddit }}) => subreddit ? `Reddit r/${subreddit}` : 'Reddit',
    options: [
      { value: 'subreddit', label: 'Subreddit', regex: /^[_A-Za-z0-9]{1,21}$/, default: '' },
    ],
    icon: 'reddit',
    iconFamily: FontAwesome,
    color: '#149EF0'
  },

  'hackernews': {
    value: 'hackernews',
    label: 'HackerNews',
    getLabel: () => 'HackerNews',
    options: [],
    icon: 'hacker-news',
    iconFamily: FontAwesome,
    color: '#ff6600'
  },
};

// export const validOptions = plugin => {

//   const plg = plugins[plugin.type];
//   if (plg === undefined) {
//     return ''
//   }

//   for (let i = 0; i < options.length; i++) {
//     const option = options[i];

//     if (plugin.data.hasOwnProperty(option.key)) {
//       if (!plugin.data[option.key].match(option.regex)) {
//         return 'request data value "' + option.key + '" is invalid';
//       }
//     } else if (option.default) {
//       plugin.data[option.key] = option.default;
//     } else {
//       return 'request is missing "' + option.key + '" in "data"';
//     }
//   }

//   return;
// };

export const PluginIcon = ({ plugin, size = 40 }) => {
  const data = plugins[plugin];
  if (data) {
    const Icon = data.iconFamily;
    return <Icon name={data.icon} color={data.color} size={size}/>;
  } else {
    return <MaterialIcon name="help" color={theme.SUPPORT} size={size}/>;
  }
};