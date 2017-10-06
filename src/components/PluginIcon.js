import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import theme from '../utils/theme';

const iconFamilies = {
  FontAwesome,
  MaterialIcon,
};

export default ({ plugin, size = 36 }) => {

  // Fixes styling bug on the web
  const style = {
    lineHeight: size,
  };

  if (plugin) {
    const Icon = iconFamilies[plugin.iconFamily] || FontAwesome;
    return <Icon name={plugin.icon} color={plugin.color} size={size} style={style}/>;
  } else {
    return <MaterialIcon name="help" color={theme.SUPPORT} size={size} style={style}/>;
  }
};
