// Inject required fonts into css
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import materialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import { Platform } from 'react-native';

// Load styles
import './src/styles/styles.scss';

// Load js
import './src';

import injectStyle from './src/utils/injectStyle';

injectStyle('FontAwesome', fontAwesome);
injectStyle('Material Icons', materialIcons);

global.mobile = true;
