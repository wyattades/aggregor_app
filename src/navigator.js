import { StackNavigator } from 'react-navigation';

import Home from './containers/Home';
import Counter from './containers/Counter';
import Login from './containers/Login'

const AppNavigator = new StackNavigator(
  {
    Home: { screen: Home },
    Counter: { screen: Counter },
    Login: { screen: Login }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      // header: null
    }
  }
);

export default AppNavigator;
