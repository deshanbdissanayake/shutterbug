import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/common/logo.png')} style={styles.gifImageStyles}/>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gifImageStyles: {
        width: 250,
        resizeMode: 'contain',
    },
});
