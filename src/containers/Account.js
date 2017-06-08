import React, { PropTypes } from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import theme from '../utils/theme';
import { deleteUser } from '../actions/api';
import { prompt } from '../utils/prompt';
import { SubmitButton } from '../components/Form';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
  },
  label:{
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 18,
    color: theme.TEXT_SECOND
  },
  value:{
    color: theme.TEXT,
    fontSize: 18,
    padding: 12,
    backgroundColor: theme.SUPPORT,
  },
  textGroup: {
    paddingVertical: 12,
  },
  link: {
    color: theme.TEXT_SECOND,
    padding: 4,
    flexWrap: 'wrap',
  },
  
  dangerButton: {
    backgroundColor: theme.ERROR,
  }
});

const handleDeleteUser = dispatch => () => {
  dispatch(prompt({
    title: 'Are you sure you want to delete your account? Please enter your password to confirm.',
    submitText: 'Delete',
    textInputProps: {
      secureTextEntry: true,
    },
    onSubmit: password => dispatch(deleteUser(password)).catch(() => {
      ToastAndroid.show('Invalid password provided', ToastAndroid.SHORT);
    })
  }));
};

const handleChangePassword = dispatch => () => {
  dispatch(prompt({
    title: 'Set a new password below',
    submitText: 'Change',
    textInputProps: {
      secureTextEntry: true,
    },
    onSubmit: password => ToastAndroid.show('Sorry, changing passwords is not yet supported.', ToastAndroid.SHORT)
  }));
};

const Account = ({ user, dispatch, navigation }) => (
  <View style={styles.container}>
    <View>
      <View style={styles.textGroup}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user.username}</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email || '<email>'}</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>••••••••</Text>
        <TouchableNativeFeedback onPress={handleChangePassword(dispatch)}>
          <View>
            <Text style={styles.link}>Change Password</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
    <SubmitButton 
      title="DELETE ACCOUNT" 
      style={styles.dangerButton}
      onPress={handleDeleteUser(dispatch)}/>
  </View>
);

Account.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(state => ({
  user: state.user
}))(Account);
