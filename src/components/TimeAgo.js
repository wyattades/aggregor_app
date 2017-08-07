import React from 'react';
import { View, Platform } from 'react-native';

const _Temp = () => <View/>;

const TimeAgo = Platform.OS === 'web' ? _Temp : require('react-native-timeago');

export default TimeAgo;