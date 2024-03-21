import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ServicesListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Services List</Text>
      <Text>under development</Text>
    </View>
  )
}

export default ServicesListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
})