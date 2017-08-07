import injectStyle from './src/utils/injectStyle';

// Load css files
import 'normalize.css';
import './src/styles/styles.default.scss';

// Inject required fonts into css
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import materialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
injectStyle('FontAwesome', fontAwesome);
injectStyle('Material Icons', materialIcons);

// Run app
import './src';