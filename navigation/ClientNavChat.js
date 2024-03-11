import React, { useLayoutEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from '../screens/common/ChatListScreen';
import ChatSingleScreen from '../screens/common/ChatSingleScreen';
import { useNavigation } from '@react-navigation/native'
import CustomOfferViewScreen from '../screens/client/CustomOfferViewScreen';
import PaymentMethodScreen from '../screens/client/PaymentMethodScreen';
import BankPaymentScreen from '../screens/client/paymentScreens/BankPaymentScreen';
import PaypalPaymentScreen from '../screens/client/paymentScreens/PaypalPaymentScreen';
import InvoiceViewScreen from '../screens/client/InvoiceViewScreen';
import JobSingleScreen from '../screens/client/JobSingleScreen';

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
      <Stack.Screen name="Custom Offer" component={CustomOfferViewScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Payement Methods" component={PaymentMethodScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Bank Payment" component={BankPaymentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Paypal Payment" component={PaypalPaymentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Invoice View" component={InvoiceViewScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Single Job" component={JobSingleScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ClientNavChat;
