import { StyleSheet } from 'react-native';

import theme from './theme';

export default StyleSheet.create({
  form: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  inputGroup: {
    // marginBottom: 15,
    // flexDirection: 'column',
  },
  input: {
    padding: 10,
    backgroundColor: '#FFF',
    width: 300,
    borderWidth: 1,
    borderColor: theme.DIVIDER,
  },
  label: {
    fontWeight: '700',
    padding: 10,
  },
  button: {
    marginVertical: 15,
    backgroundColor: theme.PRIMARY,
    // justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    fontSize: 18,
    padding: 15,
    color: theme.WHITE
  },
  error: {
    color: theme.ERROR,
    paddingTop: 5,
    paddingLeft: 5,
  },
});
