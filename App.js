import React, { useEffect } from 'react';
import { Keyboard, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import layout
import { AppProvider, useAppContext } from './layouts/AppContext';

import colors from './assets/colors/colors';
import SplashScreen from './screens/SplashScreen';
import WelcomeNav from './navigation/WelcomeNav';
import ClientNav from './navigation/ClientNav';
import LoadingScreen from './screens/LoadingScreen';
import ProviderNav from './navigation/ProviderNav';

const Stack = createStackNavigator();

const App = () => {
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
    <AppProvider>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <AppContent />
    </AppProvider>
  );
}

const AppContent = () => {
  // for check the login status globally
  const { isLoggedIn, setIsLoggedIn, isPageLoading, setIsPageLoading, showSplashScreen, setShowSplashScreen, isClient, setIsClient } = useAppContext();

  useEffect(() => {
    // to authenticate the user
    const authUser = async () => {
      try{
        const token = await AsyncStorage.getItem("shutterbug-app-login-token");
        if(token != null){
          setIsLoggedIn(true);
          //AsyncStorage.removeItem("shutterbug-app-login-token");
        }else{
          setIsLoggedIn(false);
        }
      }catch(error){
        setIsLoggedIn(false);
      }
    }

    //for check if the user is logged in or not
    authUser().then(() => {
      //remove page loading
      setIsPageLoading(false);
      //hide splash screen
      setShowSplashScreen(false);
    });

    // unfocus from text inputs when keyboard hides
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // This will blur the currently focused input field
      Keyboard.dismiss();
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);


    return(
      <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator>
                {!isLoggedIn ? (
                    <Stack.Screen name="Welcome Nav" component={WelcomeNav} options={{headerShown: false}} />
                  ) : (
                    isClient ? (
                      <Stack.Screen name="Client Main" component={ClientNav} options={{headerShown: false}} />
                    ) : (
                      <Stack.Screen name="Provider Main" component={ProviderNav} options={{headerShown: false}} />
                    )
                  )}
              </Stack.Navigator>
            </NavigationContainer>
      </SafeAreaView>
    )
}

export default App;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: colors.white,
  }
});