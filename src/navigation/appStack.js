import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { isUserAdmin } from '../database/methods';

import AppDrawerNavigator from './appDrawer';

import ContactShow from '../screens/customers/show';
import CustomerIndex from '../screens/customers/index';
import ContactCreate from '../screens/customers/create';
import DistributorCreate from '../screens/distributors/create';
import TodaysServices from '../screens/services';
import ShowService from '../screens/services/show';
import ClosedServices from '../screens/services/closed';

class AppStackNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
    };
    const {
      user: { email },
    } = props;
    isUserAdmin(email).then(isAdmin => {
      this.setState({
        isAdmin: isAdmin,
      });
    });
  }

  render() {
    const { user } = this.props;
    const { isAdmin } = this.state;
    const AppStack = createStackNavigator();
    return (
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{ animationEnabled: false }}
          headerMode="none">
          <AppStack.Screen
            name="Drawer"
            children={() => (
              <AppDrawerNavigator headerMode isAdmin={isAdmin} user={user} />
            )}
          />
          <AppStack.Screen name="Contact Show" component={ContactShow} />
          <AppStack.Screen name="Customer Index" component={CustomerIndex} />
          <AppStack.Screen name="Customer Create" component={ContactCreate} />
          <AppStack.Screen name="Todays Services" component={TodaysServices} />
          <AppStack.Screen name="Closed Services" component={ClosedServices} />
          <AppStack.Screen name="Show Service" component={ShowService} />
          <AppStack.Screen
            name="Distributor Create"
            component={DistributorCreate}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppStackNavigator;
