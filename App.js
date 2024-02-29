import React, { useEffect } from 'react';
import { Keyboard, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from './assets/colors/colors';
import SplashScreen from './screens/SplashScreen';
import WelcomeNav from './navigation/WelcomeNav';
import ClientNav from './navigation/ClientNav';

const App = () => {
  // unfocus from text inputs when keyboard hides
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // This will blur the currently focused input field
      Keyboard.dismiss();
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  // load fonts
  const [fontsLoaded] = useFonts({
    'impact-font': require('./assets/fonts/impact.ttf'),
    'popb-font': require('./assets/fonts/Poppins-Bold.ttf'),
    'popr-font': require('./assets/fonts/Poppins-Regular.ttf'),
    'popsb-font': require('./assets/fonts/Poppins-SemiBold.ttf'),
  }); 

  if (!fontsLoaded ) {
    return <SplashScreen/>
  }

  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
          <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Client Main" component={ClientNav} options={{headerShown: false}} />
            </Stack.Navigator>
          </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: colors.bgLight,
  }
});
