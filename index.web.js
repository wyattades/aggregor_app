// Inject required fonts into css
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import materialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

// Load styles
import './src/styles/styles.scss';

// Load js
import './src';

import injectFont from './src/utils/injectFont';

injectFont('FontAwesome', fontAwesome);
injectFont('Material Icons', materialIcons);
