import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppDrawerNavigator from './appDrawer';

const AppStack = createStackNavigator();
const AppStackNavigator = user => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen
          name="Home"
          children={() => <AppDrawerNavigator user={user} />}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigator;
