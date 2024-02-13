import React from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import SigninScreen from '../screens/SigninScreen';
import colors from '../assets/colors/colors';
import ClientNav from './ClientNav';

const AppNav = () => {
  return (
    <View style={styles.container}>
      <ClientNav/>
    </View>
  );
};

export default AppNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})