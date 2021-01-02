// Inject required fonts into css
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import materialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

// Load styles
import './src/styles/styles.scss';

// Load js
import './src';
import { init } from './src/actions/api';
import injectFont from './src/utils/injectFont';

init(process.env.API_URL, process.env.API_KEY);

injectFont('FontAwesome', fontAwesome);
injectFont('MaterialIcons', materialIcons);
