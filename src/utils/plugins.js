import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import theme from './theme';

const plugins = {
  'reddit': {
    icon: 'reddit',
    family: IonIcon,
    color: 'blue'
  },
  'hackernews': {
    icon: 'hackernews',
    family: IonIcon,
    color: 'orange'
  },
};

export const PluginIcon = ({ plugin, size = 40 }) => {
  const data = plugins[plugin];
  if (data) {
    const Icon = data.family;
    return <Icon name={data.icon} color={data.color} size={size}/>;
  } else {
    return <MaterialIcon name="help" color={theme.SUPPORT} size={size}/>;
  }
};