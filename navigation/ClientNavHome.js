import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/client/HomeScreen';
import SearchScreen from '../screens/client/SearchScreen';
import ServiceScreenSingle from '../screens/client/ServiceScreenSingle';
import ProfileScreen from '../screens/common/ProfileScreen';
import ChatSingleScreen from '../screens/common/ChatSingleScreen';
import SingleNewsScreen from '../screens/client/SingleNewsScreen';

const Stack = createStackNavigator();

const ClientNavHome = ({ navigation }) => {

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate("Home");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search Item" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Service Single" component={ServiceScreenSingle} options={{ headerShown: false }} />
        <Stack.Screen name="Provider Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Single Chat" component={ChatSingleScreen} options={{ headerShown: false }} />
        <Stack.Screen name="News Single" component={SingleNewsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ClientNavHome;
