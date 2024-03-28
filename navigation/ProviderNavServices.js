import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServiceScreenSingle from '../screens/common/ServiceScreenSingle';
import ServicesListScreen from '../screens/provider/ServicesListScreen';
import ServiceCreateScreen from '../screens/provider/ServiceCreateScreen';
import ServiceCreatePackagesScreen from '../screens/provider/ServiceCreatePackagesScreen';
import ServiceCreatePackageAddScreen from '../screens/provider/ServiceCreatePackageAddScreen';

const Stack = createStackNavigator();

const ProviderNavSearch = ({ navigation }) => {

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate("Service List");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator>
        <Stack.Screen name="Service List" component={ServicesListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Service Single" component={ServiceScreenSingle} options={{ headerShown: false }} />
        <Stack.Screen name="Service Create" component={ServiceCreateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Service Package Create" component={ServiceCreatePackagesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Service Package Add" component={ServiceCreatePackageAddScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ProviderNavSearch;
