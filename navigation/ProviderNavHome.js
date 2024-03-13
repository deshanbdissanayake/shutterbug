import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/provider/HomeScreen';

const Stack = createStackNavigator();

const ProviderNavHome = ({ navigation }) => {

  React.useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.navigate("Home");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ProviderNavHome;
