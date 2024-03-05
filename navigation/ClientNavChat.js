import React, {useEffect, useLayoutEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from '../screens/common/ChatListScreen';
import ChatSingleScreen from '../screens/common/ChatSingleScreen';
import { useNavigation } from '@react-navigation/native'

const Stack = createStackNavigator();

const ClientNavChat = ({ handleShowTabBar }) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate("Chat List");
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    handleShowTabBar(true)
  },[])

  return (
    <Stack.Navigator>
        <Stack.Screen name="Chat List" component={ChatListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Single Chat" component={ChatSingleScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ClientNavChat;
