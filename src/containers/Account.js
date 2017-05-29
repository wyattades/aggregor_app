import React, { PropTypes } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { connect } from 'react-redux';

import { deleteUser } from '../actions/api';

// TODO

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
  <View>
    <Text>Account Page</Text>
    <Text>Username: {user.username}</Text>
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
