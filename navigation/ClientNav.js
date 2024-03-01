import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Octicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import colors from '../assets/colors/colors';
import ProfileScreen from '../screens/common/ProfileScreen';
import ClientNavHome from './ClientNavHome';
import ClientNavSearch from './ClientNavSearch';
import ClientNavChat from './ClientNavChat';
import ClientNavJob from './ClientNavJob';
import CustomOfferViewScreen from '../screens/client/CustomOfferViewScreen';

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

        if (route.name === 'Client Home') {
            icon = <Octicons name="home" size={24} />;
        } else if (route.name === 'Client Chats') {
            icon = <Ionicons name="chatbubble-ellipses-outline" size={24} />;
        } else if (route.name === 'Client Search') {
            icon = <Octicons name="search" size={24} />;
        } else if (route.name === 'Client Orders') {
            icon = <MaterialCommunityIcons name="file-table-box-multiple-outline" size={24}/>;
        } else if (route.name === 'Client Account') {
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

export default function ClientNav() {
  const route = useRoute();
  const shouldShowTabBar = route.params ? !route.params.hideTabBar : true;

  return (
      <Tab.Navigator tabBar={shouldShowTabBar ? props => <MyTabBar {...props} /> : () => null}>
        <Tab.Screen name="Client Home" component={ClientNavHome} options={{ headerShown: false }} />
        <Tab.Screen name="Client Search" component={ClientNavSearch} options={{ headerShown: false }} />
        <Tab.Screen name="Client Chats" component={ClientNavChat} options={{ headerShown: false }} />
        <Tab.Screen name="Client Orders" component={ClientNavJob} options={{ headerShown: false }} />
        <Tab.Screen name="Client Account" component={CustomOfferViewScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
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