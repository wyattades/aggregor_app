import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const iconFamilies = {
  FontAwesome,
  MaterialIcon,
};

import theme from '../utils//theme';

export default ({ plugin, size = 40 }) => {
  if (plugin) {
    const Icon = iconFamilies[plugin.iconFamily] || FontAwesome;
    return <Icon name={plugin.icon} color={plugin.color} size={size}/>;
  } else {
    return <MaterialIcon name="help" color={theme.SUPPORT} size={size}/>;
  }
};