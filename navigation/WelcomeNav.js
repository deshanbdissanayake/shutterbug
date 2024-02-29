import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';

const WelcomeNav = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sign In" component={SigninScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sign Up" component={SignupScreen} options={{ headerShown: false }}  />
    </Stack.Navigator>
  )
}

export default WelcomeNav
