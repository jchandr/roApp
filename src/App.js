import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigator from './navigation/index';

const App = () => (
  <NavigationContainer>
    <RootStackNavigator />
  </NavigationContainer>
);

export default App;
