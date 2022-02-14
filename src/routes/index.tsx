import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from "@hooks/auth";
import { SignIn } from "@screens/SignIn";
import { UserTabRoutes } from "./user.tab.routes";
import { UserStackRoutes } from "./user.stack.routes";

export function Routes() {
  const { user } = useAuth();

  console.log(user);
  return (
    <NavigationContainer>
      { user ? <UserStackRoutes /> : <SignIn /> }
    </NavigationContainer>
  )
}