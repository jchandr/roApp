import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/home/index';
import Dashboard from '../screens/dashboard/index';
import CustomDrawer from '../components/appDrawer/index';

const AppDrawer = createDrawerNavigator();
const AppDrawerNavigator = ({ isAdmin }) => {
  if (isAdmin) {
    return (
      <AppDrawer.Navigator
        initialRouteName="Home"
        overlayColor="#ebedf0"
        drawerContent={props => <CustomDrawer {...props} />}>
        <AppDrawer.Screen name="Home" component={Home} />
        <AppDrawer.Screen name="Dashboard" component={Dashboard} />
      </AppDrawer.Navigator>
    );
  } else {
    return (
      <AppDrawer.Navigator
        initialRouteName="Home"
        overlayColor="#ebedf0"
        drawerContent={props => <CustomDrawer {...props} />}>
        <AppDrawer.Screen name="Home" component={Home} />
      </AppDrawer.Navigator>
    );
  }
};

export default AppDrawerNavigator;
