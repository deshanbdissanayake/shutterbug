import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobListScreen from '../screens/client/JobListScreen';
import JobSingleScreen from '../screens/client/JobSingleScreen';
import ProfileScreen from '../screens/common/ProfileScreen';
import ChatSingleScreen from '../screens/common/ChatSingleScreen';
import ServiceScreenSingle from '../screens/common/ServiceScreenSingle';
import JobCaseFormScreen from '../screens/client/JobCaseFormScreen';
import JobReviewFormScreen from '../screens/client/JobReviewFormScreen';

const Stack = createStackNavigator();

const ClientNavJob = ({ navigation }) => {

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate('Job List');
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator>
        <Stack.Screen name="Job List" component={JobListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Single Job" component={JobSingleScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Single Chat" component={ChatSingleScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Provider Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Service Single" component={ServiceScreenSingle} options={{ headerShown: false }} />
        <Stack.Screen name="Job Case" component={JobCaseFormScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Job Review" component={JobReviewFormScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ClientNavJob;
