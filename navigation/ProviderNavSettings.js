import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/common/SettingsScreen';
import JobRequestScreen from '../screens/common/JobRequestScreen';
import JobRequestCreateScreen from '../screens/client/JobRequestCreateScreen';
import ProfileEditScreen from '../screens/common/ProfileEditScreen';
import JobRequestApplyScreen from '../screens/provider/JobRequestApplyScreen';

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
    </Stack.Navigator>
  );
};

export default ProviderNavSettings;
