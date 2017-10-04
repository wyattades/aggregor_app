import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Touchable from '../components/Touchable';
import theme from '../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textGroup: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    color: theme.PRIMARY_DARK,
    marginVertical: 8,
  },
  text: {
    fontSize: 34,
    color: theme.ACCENT,
    fontWeight: 'bold',
  },
  subtext: {
    color: theme.TEXT,
    fontSize: 30,
    marginVertical: 10,
    
  },
});

const getError = params => {
  switch (params.code) {
    case 404: return `Page "${params.path}" not found`;
    default: return 'Unknown error';
  }
};

const ErrorPage = ({ history, err }) => {

  const params = err || {
    code: 0,
  };

  // TODO: try <Link to="/login" component={Touchable}/>
  return (
    <View style={styles.container}>
      <Touchable onPress={() => history.push('/login')}>
        <Text style={styles.title}>Aggregor</Text>
      </Touchable>
      
      <View style={styles.textGroup}>
        <Text style={styles.text}>Error {params.code}</Text>
        <Text style={styles.subtext}>{getError(params)}</Text>
      </View>

      <Touchable onPress={() => history.push('/login')}>
        <Text style={styles.subtext}>&larr; Go back</Text>
      </Touchable>
    </View>
  );
};

export default ErrorPage;
