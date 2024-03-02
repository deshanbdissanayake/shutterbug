import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color={colors.primary} />
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    }
})