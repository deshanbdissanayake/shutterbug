import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/common/SettingsScreen';
import JobRequestScreen from '../screens/common/JobRequestScreen';
import JobRequestCreateScreen from '../screens/client/JobRequestCreateScreen';
import ProfileEditScreen from '../screens/common/ProfileEditScreen';
import JobRequestOffers from '../screens/client/JobRequestOffers';
import CaseListScreen from '../screens/common/CaseListScreen';
import ChatSingleScreen from '../screens/common/ChatSingleScreen';
import CustomOfferViewScreen from '../screens/common/CustomOfferViewScreen';
import TransactionsScreen from '../screens/common/TransactionsScreen';

const Stack = createStackNavigator();

const ClientNavSettings = ({ navigation }) => {

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
        <Stack.Screen name="Job Request Create" component={JobRequestCreateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Job Request Offers" component={JobRequestOffers} options={{ headerShown: false }} />
        <Stack.Screen name="Profile Edit" component={ProfileEditScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Case List" component={CaseListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat Single" component={ChatSingleScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Offer View" component={CustomOfferViewScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ClientNavSettings;
