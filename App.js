import React, { useEffect } from 'react';
import { Keyboard, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
      <AppContent />
    </AppProvider>
  );
}

const AppContent = () => {
  // for check the login status globally
  const { isLoggedIn, setIsLoggedIn, isPageLoading, setIsPageLoading, showSplashScreen, setShowSplashScreen } = useAppContext();

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
        //console.log(error);
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

  if(isPageLoading){
    return(  
      <SafeAreaView style={styles.container}>
        {(showSplashScreen) ? (
          <SplashScreen/>
        ) : (
          <LoadingScreen />
        )}
      </SafeAreaView>
    )
  }else{
    return(
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView style={styles.container}>
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
            <NavigationContainer>
              <Stack.Navigator>
                {!isLoggedIn ? (
                    <Stack.Screen name="Welcome Nav" component={WelcomeNav} options={{headerShown: false}} />
                  ) : (
                    <Stack.Screen name="Client Main" component={ClientNav} options={{headerShown: false}} />
                  )}
              </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    )
  }
}

export default App;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: colors.white,
  }
});