import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from '../screens/common/ChatListScreen';
import ChatSingleScreen from '../screens/common/ChatSingleScreen';

const Stack = createStackNavigator();

const ClientNavChat = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen name="Chat List" component={ChatListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Single Chat" component={ChatSingleScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ClientNavChat;
