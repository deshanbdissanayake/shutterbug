import React from 'react'

const WelcomeNav = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sign In" component={SigninScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sign Up" component={SignupScreen} options={{ headerShown: false }}  />
    </Stack.Navigator>
  )
}

export default WelcomeNav
