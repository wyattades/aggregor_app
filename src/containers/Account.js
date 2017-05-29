import React, { PropTypes } from 'react';
import { View, Text, Button, Alert, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import { deleteUser } from '../actions/api';

const styles = StyleSheet.create({
  AccountDisplay:{
    marginHorizontal: 15
  },
  header:{
    fontSize: 25,
    fontWeight: 'bold',
    padding: 15
  },
  normalText:{
    fontSize: 20,
    paddingLeft: 15,
    paddingBottom: 40
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
    <Text style={styles.header}>Account Page</Text>
    <Text style={styles.normalText}>Username: {user.username}</Text>
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
