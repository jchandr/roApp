import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../screens/dashboard/index';
import CustomDrawer from '../components/appDrawer/index';

import HomeTopTabNavigator from './homeTopBarNavigator';

const AppDrawer = createDrawerNavigator();
const AppDrawerNavigator = ({ isAdmin }) => {
  if (isAdmin) {
    return (
      <AppDrawer.Navigator
        screenOptions={{
          headerShown: true,
        }}
        initialRouteName="Home"
        overlayColor="grey"
        activeTintColor="#ffcdbe"
        drawerContent={props => <CustomDrawer {...props} />}>
        <AppDrawer.Screen name="Home" component={HomeTopTabNavigator} />
        <AppDrawer.Screen name="Dashboard" component={Dashboard} />
      </AppDrawer.Navigator>
    );
  } else {
    return (
      <AppDrawer.Navigator
        initialRouteName="Home"
        overlayColor="grey"
        activeTintColor="#ffcdbe"
        drawerContent={props => <CustomDrawer {...props} />}>
        <AppDrawer.Screen name="Home" component={HomeTopTabNavigator} />
      </AppDrawer.Navigator>
    );
  }
};

export default AppDrawerNavigator;
