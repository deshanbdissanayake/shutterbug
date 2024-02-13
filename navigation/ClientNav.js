import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Octicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/client/HomeScreen';
import ChatListScreen from '../screens/common/ChatListScreen';
import colors from '../assets/colors/colors';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
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

        if (route.name === 'Home') {
            icon = <Octicons name="home" size={24} />;
        } else if (route.name === 'Chats') {
            icon = <Ionicons name="chatbubble-ellipses-outline" size={24} />;
        } else if (route.name === 'Search') {
            icon = <Octicons name="search" size={24} />;
        } else if (route.name === 'Orders') {
            icon = <MaterialCommunityIcons name="file-table-box-multiple-outline" size={24}/>;
        } else if (route.name === 'Account') {
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

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props}  />} >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}  />
            <Tab.Screen name="Chats" component={ChatListScreen} options={{ headerShown: false }}  />
            <Tab.Screen name="Search" component={ChatListScreen} options={{ headerShown: false }}  />
            <Tab.Screen name="Orders" component={ChatListScreen} options={{ headerShown: false }}  />
            <Tab.Screen name="Account" component={ChatListScreen} options={{ headerShown: false }}  />
        </Tab.Navigator>
    </NavigationContainer>
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