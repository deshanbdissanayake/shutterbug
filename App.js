import React, { useEffect } from 'react';
import { View, Keyboard, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

import colors from './assets/colors/colors';
import AppNav from './navigation/AppNav';
import SplashScreen from './screens/SplashScreen';

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

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={styles.container}>
          <AppNav/>
        </View>
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
