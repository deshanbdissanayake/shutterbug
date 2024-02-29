import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/client/SearchScreen';
import ServiceScreenSingle from '../screens/client/ServiceScreenSingle';
import ProfileScreen from '../screens/common/ProfileScreen';
import ChatSingleScreen from '../screens/common/ChatSingleScreen';

const Stack = createStackNavigator();

const ClientNavSearch = ({ navigation }) => {

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate("Search");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Service Single" component={ServiceScreenSingle} options={{ headerShown: false }} />
        <Stack.Screen name="Provider Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Single Chat" component={ChatSingleScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ClientNavSearch;
