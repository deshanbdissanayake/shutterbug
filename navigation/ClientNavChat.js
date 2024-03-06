import React, { useLayoutEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from '../screens/common/ChatListScreen';
import ChatSingleScreen from '../screens/common/ChatSingleScreen';
import { useNavigation } from '@react-navigation/native'

const Stack = createStackNavigator();

const ClientNavChat = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate("Chat List");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat List" component={ChatListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Single Chat" component={ChatSingleScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ClientNavChat;
