import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/login/index';

const AuthStack = createStackNavigator();
const AuthStackNavigator = () => (
  <NavigationContainer>
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  </NavigationContainer>
);

export default AuthStackNavigator;
