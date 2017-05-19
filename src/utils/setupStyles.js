import { StatusBar } from 'react-native';

import theme from './theme';

export default () => {
  StatusBar.setBackgroundColor(theme.STATUS_BAR);
};