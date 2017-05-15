import * as counter from './counter';
import * as api from './api';
import * as navActions from './navActions';

export default { 
  ...counter,
  ...api,
  ...navActions,
};