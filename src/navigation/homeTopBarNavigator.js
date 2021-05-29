import React from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../screens/home/index';

const TopTab = createMaterialTopTabNavigator();

function HomeTopTabNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Home" component={Home} />
      <TopTab.Screen name="Settings" children={() => <Text>Settings</Text>} />
    </TopTab.Navigator>
  );
}

export default HomeTopTabNavigator;
