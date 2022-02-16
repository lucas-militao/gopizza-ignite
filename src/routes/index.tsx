import React from 'react';

import { useAuth } from '@hooks/auth';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '@screens/SignIn';

import { UserStackRoutes } from './user.stack.routes';

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <UserStackRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
