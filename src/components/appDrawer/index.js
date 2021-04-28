import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

import styles from '../../styles/components/appDrawer/index';
import AuthContext from '../../auth/index';

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
        <DrawerItemList {...this.props} />
        <DrawerItem
          style={styles.logoutButton}
          label="Logout"
          onPress={() => this._handleUserSignOutClick()}
        />
      </DrawerContentScrollView>
    );
  }
}

export default CustomDrawer;
