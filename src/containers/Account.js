import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import theme from '../utils/theme';
import { deleteUser, updateUser } from '../actions/api';
import { prompt } from '../utils/prompt';
import alert from '../utils/alert';
import { SubmitButton } from '../components/Form';
import Touchable from '../components/Touchable';
import Container from '../components/Container';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 18,
    color: theme.TEXT_SECOND,
  },
  value: {
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
  },
});

const handleDeleteUser = dispatch => () => {
  dispatch(prompt({
    title: 'Are you sure you want to delete your account? Please enter your password to confirm.',
    submitText: 'Delete',
    textInputProps: {
      secureTextEntry: true,
    },
    onSubmit: password => dispatch(deleteUser(password)).catch(() => {
      alert('Invalid password provided');
    }),
  }));
};

const handleChangePassword = dispatch => () => {
  dispatch(prompt({
    title: 'Set a new password below',
    submitText: 'Change',
    textInputProps: {
      secureTextEntry: true,
    },
    onSubmit: password => dispatch(updateUser({ password })).then(
      () => alert('Password successfully changed.'),
      err => {
        if (err.code === 400) {
          alert('Sorry, invalid password.');
        }
      },
    ),
  }));
};

const Account = ({ user, dispatch }) => (
  <Container style={styles.container} adjust={0.6}>
    <View>
      <View style={styles.textGroup}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user.username}</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{`${user.first_name || ''} ${user.last_name || ''}`}</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email || ' '}</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>••••••••</Text>
        <Touchable onPress={handleChangePassword(dispatch)}>
          <Text style={styles.link}>Change Password</Text>
        </Touchable>
      </View>
    </View>
    <SubmitButton
      title="DELETE ACCOUNT"
      style={styles.dangerButton}
      onPress={handleDeleteUser(dispatch)}/>
  </Container>
);

Account.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(state => ({
  user: state.user,
}))(Account);
