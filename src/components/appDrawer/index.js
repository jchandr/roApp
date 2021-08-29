import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

import AuthContext from '../../auth/index';
import commonStyles from '../../styles/commonStyles';

class CustomDrawer extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleUserSignOutClick() {
    auth().signOut();
  }

  render() {
    const user = this.context;

    return (
      <DrawerContentScrollView {...this.props}>
        <View
          style={[
            styles.customDrawerItemWrapper,
            styles.userProfileDrawerItemWrapper,
          ]}>
          <View>
            <Text style={styles.userProfileDrawerItemEmail}>{user.email}</Text>
          </View>
        </View>
        <DrawerItemList
          activeBackgroundColor="#ffcdbe"
          labelStyle={{ color: 'black' }}
          {...this.props}
        />
        <DrawerItem
          style={styles.logoutButton}
          label={() => <Text style={styles.logoutButtonLabelText}>Logout</Text>}
          onPress={() => this._handleUserSignOutClick()}
        />
      </DrawerContentScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ...commonStyles,
  logoutButton: {
    backgroundColor: '#fe7426',
  },
  logoutButtonLabelText: {
    color: '#ffffff',
  },
  customDrawerItemWrapper: {
    padding: 5,
  },
  userProfileDrawerItemWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  userProfileDrawerItemAvatar: {},
  userProfileDrawerItemEmail: {
    paddingLeft: 10,
    fontSize: 17,
  },
});

export default CustomDrawer;
