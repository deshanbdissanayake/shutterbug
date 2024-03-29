import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Octicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../assets/colors/colors';
import ClientNavHome from './ClientNavHome';
import ClientNavSearch from './ClientNavSearch';
import ClientNavChat from './ClientNavChat';
import ClientNavJob from './ClientNavJob';
import { TabBarProvider, useTabBarVisibility } from '../layouts/TabBarContext';
import ClientNavSettings from './ClientNavSettings';
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

        if (route.name === 'Client Home') {
            icon = <Octicons name="home" size={24} />;
        } else if (route.name === 'Client Chats') {
            icon = <Ionicons name="chatbubble-ellipses-outline" size={24} />;
        } else if (route.name === 'Client Search') {
            icon = <Octicons name="search" size={24} />;
        } else if (route.name === 'Client Orders') {
            icon = <MaterialCommunityIcons name="file-table-box-multiple-outline" size={24}/>;
        } else if (route.name === 'Client Settings') {
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
          name="Client Home" 
          component={ClientNavHome} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Client Search" 
          component={ClientNavSearch} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Client Chats" 
          component={ClientNavChat}
          options={{ headerShown: false}}
        />
        <Tab.Screen 
          name="Client Orders" 
          component={ClientNavJob} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Client Settings" 
          component={ClientNavSettings} 
          options={{ headerShown: false }} 
        />
      </Tab.Navigator>
  )
}

export default function ClientNav() {

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