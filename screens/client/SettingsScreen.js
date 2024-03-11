import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Under development</Text>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
})