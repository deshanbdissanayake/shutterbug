import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import SigninScreen from '../screens/SigninScreen';
import colors from '../assets/colors/colors';
import ClientNav from './ClientNav';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

const AppNav = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Sign In" component={SigninScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Sign Up" component={SignupScreen} options={{ headerShown: false }}  />
          <Stack.Screen name="Client" component={ClientNav} options={{ headerShown: false }}  />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
