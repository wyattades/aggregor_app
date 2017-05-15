import { StyleSheet } from 'react-native';

import theme from './theme';

export default StyleSheet.create({
  inputGroup: {
    // marginHorizontal: 15,
  },

  input: {
    padding: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: theme.DIVIDER,
  },
  label: {
    fontWeight: 'bold',
    padding: 10,
  },

  button: {
    marginTop: 25,
    backgroundColor: theme.PRIMARY,
    // Override button's default margins
    marginLeft: 0,
    marginRight: 0,
  },
  buttonText: { // unused
    fontSize: 18,
    padding: 15,
    color: theme.WHITE
  },

  inputError: {
    borderColor: theme.ERROR,
  },
  errorText: {
    color: theme.ERROR,
    paddingTop: 5,
    paddingLeft: 5,
  },

  mainErrorText: {
    color: theme.ERROR,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  mainErrorView: {
    padding: 12,
    borderWidth: 1,
    borderColor: theme.ERROR,
  },
});
