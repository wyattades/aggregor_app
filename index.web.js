// Inject required fonts into css
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import materialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

// Load css files
import 'normalize.css';
import './src/styles/styles.default.scss';
import './src';

import injectStyle from './src/utils/injectStyle';

injectStyle('FontAwesome', fontAwesome);
injectStyle('Material Icons', materialIcons);

let l = window.location.href;
const newL = l.replace('www.', '');
if (newL !== l) {
  window.location.replace(newL);
}
