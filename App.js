import React, { useEffect } from 'react';
import { Keyboard, StyleSheet, SafeAreaView, StatusBar, Alert, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

//expo location
import * as Location from 'expo-location'

// expo device and notifications
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

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
    // Function to fetch the user's current location
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Location Permission Denied', 'Without location access, we cannot show results based on nearby locations.');
          return;
        }
        
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        // save current location in async storage
        await AsyncStorage.removeItem("shutterbug-currentLocation");
        await AsyncStorage.setItem("shutterbug-currentLocation", JSON.stringify(location));
        //console.log(await AsyncStorage.getItem("shutterbug-currentLocation"))
      } catch (error) {
        // Handle errors
        Alert.alert('Error', 'Failed to get location');
        //console.error(error);
      }
    };

    fetchLocation();

    // Function to fetch the user's device token to push notifications
    const registerForPushNotificationsAndSaveDevice = async () => {
      let token;

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId: 'cbf1f51f-1c0e-45b0-9ccc-004db7810465' })).data;
      }

      // save notification token in async storage
      await AsyncStorage.removeItem("shutterbug-notifyToken");
      await AsyncStorage.setItem("shutterbug-notifyToken", token);
      // save device details in async storage
      await AsyncStorage.removeItem("shutterbug-deviceData");
      await AsyncStorage.setItem("shutterbug-deviceData", JSON.stringify(Device));
    }

    registerForPushNotificationsAndSaveDevice();

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
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <GestureHandlerRootView style={styles.container}>
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
          </GestureHandlerRootView>
        </SafeAreaView>
      </NavigationContainer>
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