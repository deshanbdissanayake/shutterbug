import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/common/SettingsScreen';
import JobRequestScreen from '../screens/common/JobRequestScreen';
import ProfileEditScreen from '../screens/common/ProfileEditScreen';
import JobRequestApplyScreen from '../screens/provider/JobRequestApplyScreen';
import EarningsScreen from '../screens/provider/EarningsScreen';
import WithdrawScreen from '../screens/provider/WithdrawScreen';
import CaseListScreen from '../screens/common/CaseListScreen';
import ChatSingleScreen from '../screens/common/ChatSingleScreen';
import CustomOfferViewScreen from '../screens/common/CustomOfferViewScreen';
import TransactionsScreen from '../screens/common/TransactionsScreen';

const Stack = createStackNavigator();

const ProviderNavSettings = ({ navigation }) => {

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate("Settings");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Job Request" component={JobRequestScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Job Request Apply" component={JobRequestApplyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile Edit" component={ProfileEditScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Case List" component={CaseListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Earnings" component={EarningsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Withdraw" component={WithdrawScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat Single" component={ChatSingleScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Offer View" component={CustomOfferViewScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

export default ProviderNavSettings;
