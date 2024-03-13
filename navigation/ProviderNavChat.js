import React, { useLayoutEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from '../screens/common/ChatListScreen';
import ChatSingleScreen from '../screens/common/ChatSingleScreen';
import { useNavigation } from '@react-navigation/native'
import CustomOfferViewScreen from '../screens/common/CustomOfferViewScreen';
import PaymentMethodScreen from '../screens/client/PaymentMethodScreen';
import BankPaymentScreen from '../screens/client/paymentScreens/BankPaymentScreen';
import PaypalPaymentScreen from '../screens/client/paymentScreens/PaypalPaymentScreen';
import InvoiceViewScreen from '../screens/client/InvoiceViewScreen';
import JobSingleScreen from '../screens/client/JobSingleScreen';
import CustomOfferCreateScreen from '../screens/provider/CustomOfferCreateScreen';

const Stack = createStackNavigator();

const ProviderNavChat = () => {
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
      <Stack.Screen name="Custom Offer" component={CustomOfferViewScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Custom Offer Create" component={CustomOfferCreateScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ProviderNavChat;
