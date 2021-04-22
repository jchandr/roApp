import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStackNavigator from './authStack';

const RootStack = createStackNavigator();
const RootStackNavigator = function () {
  const isUserLoggedIn = false;

  if (isUserLoggedIn) {
  } else {
    return (
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      </RootStack.Navigator>
    );
  }
};

export default RootStackNavigator;
