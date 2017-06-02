import React, { PropTypes } from 'react';
import { View, Text, Button, Alert, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import theme from '../utils/theme';

import { deleteUser } from '../actions/api';

const styles = StyleSheet.create({
  AccountDisplay:{
    marginHorizontal: 15
  },
  accentText:{
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    color: theme.ACCENT
  },
  normalText:{
    color: theme.TEXT
  }
});

const handleDeleteUser = dispatch => () => {
  Alert.alert(
    'Delete Account',
    'This action cannot be undone. Are you sure?',
    [
      { text: 'Cancel' },
      { text: 'OK', onPress: () => dispatch(deleteUser()) }
    ]
  );
};

const Account = ({ user, dispatch, navigation }) => (
  <View style={styles.AccountDisplay}>
    <Text style={styles.accentText}>
      Username:
      <Text style={styles.normalText}>  {user.username}</Text>
    </Text>
    <Button title="Delete Account" onPress={handleDeleteUser(dispatch)}/>
  </View>
);

Account.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(state => ({
  user: state.user
}))(Account);
