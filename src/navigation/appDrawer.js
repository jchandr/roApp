import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/home/index';
import CustomDrawer from '../components/appDrawer/index';

const AppDrawer = createDrawerNavigator();
const AppDrawerNavigator = user => {
  return (
    <AppDrawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}>
      <AppDrawer.Screen name="Home" component={Home} />
    </AppDrawer.Navigator>
  );
};

export default AppDrawerNavigator;
