import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/login/index';

const AuthStack = createStackNavigator();
const AuthStackNavigator = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
