import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobListScreen from '../screens/client/JobListScreen';
import JobSingleScreen from '../screens/client/JobSingleScreen';

const Stack = createStackNavigator();

const ClientNavJob = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen name="Job List" component={JobListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Single Job" component={JobSingleScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ClientNavJob;
