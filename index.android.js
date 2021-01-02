import Config from 'react-native-config';

import './src';
import { init } from './src/actions/api';

init(Config.API_URL, Config.API_KEY);
