import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import AuthContext from '../auth/index';
import AuthStackNavigator from './authStack';
import AppStackNavigator from './appStack';

export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(result) {
    // handleing the autosigin after firebase login
    setUser(result);

    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // unsubscribe on unmount
    return authSubscriber;
  });

  if (initializing) {
    return null;
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <AppStackNavigator user={user} />
    </AuthContext.Provider>
  ) : (
    <AuthStackNavigator />
  );
}
