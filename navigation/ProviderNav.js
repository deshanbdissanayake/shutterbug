import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Octicons, FontAwesome5, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
import ProviderNavHome from './ProviderNavHome';
import ProviderNavServices from './ProviderNavServices';
import ProviderNavChat from './ProviderNavChat';
import ProviderNavJob from './ProviderNavJob';
import { TabBarProvider, useTabBarVisibility } from '../layouts/TabBarContext';
import ProviderNavSettings from './ProviderNavSettings';
import LoadingScreen from '../screens/LoadingScreen';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: colors.bgLight }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let icon;

        if (route.name === 'Provider Home') {
            icon = <Octicons name="home" size={24} />;
        } else if (route.name === 'Provider Chats') {
            icon = <Ionicons name="chatbubble-ellipses-outline" size={24} />;
        } else if (route.name === 'Provider Services') {
            icon = <Feather name="camera" size={24} />;
        } else if (route.name === 'Provider Orders') {
            icon = <MaterialCommunityIcons name="file-table-box-multiple-outline" size={24}/>;
        } else if (route.name === 'Provider Settings') {
            icon = <FontAwesome5 name="user" size={24} />;
        }
        
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 70 }}
          >
            <View style={[{backgroundColor: isFocused ? colors.primary: null}, styles.tabItemWrapper]}>
                <Text style={[{color: isFocused ? colors.textLight : colors.textDark}]}>{icon} </Text>
                {/*isFocused ? <Text style={[{color: isFocused ? colors.textLight : colors.textDark}, styles.tabItemText]}>{route.name}</Text> : null*/}
            </View>
          </TouchableOpacity>
        );
        
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNav = () => {
  
  const { tabBarVisible } = useTabBarVisibility();

  return (
    <Tab.Navigator tabBar={tabBarVisible ? props => <MyTabBar {...props} /> : () => null}>
       <Tab.Screen 
          name="Provider Home" 
          component={ProviderNavHome} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Provider Services" 
          component={ProviderNavServices} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Provider Chats" 
          component={ProviderNavChat}
          options={{ headerShown: false}}
        />
        <Tab.Screen 
          name="Provider Orders" 
          component={ProviderNavJob} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Provider Settings" 
          component={ProviderNavSettings} 
          options={{ headerShown: false }} 
        />
      </Tab.Navigator>
  )
}

export default function ProviderNav() {

  setTimeout(() => {
    return <LoadingScreen/>
  }, 3000);

  return (
    <TabBarProvider>
      <TabNav/>
    </TabBarProvider>
  );
}

const styles = StyleSheet.create({
    tabItemWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 60,
    },
    tabItemText: {
        textTransform: 'capitalize',
        fontSize: 10,
    }
})