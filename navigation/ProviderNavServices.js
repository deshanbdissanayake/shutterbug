import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServiceScreenSingle from '../screens/client/ServiceScreenSingle';
import ServicesListScreen from '../screens/provider/ServicesListScreen';

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
        <Stack.Screen name="Service List" component={ServicesListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Service Single" component={ServiceScreenSingle} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ClientNavSearch;
