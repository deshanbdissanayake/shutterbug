import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ServiceImage = ({ imageData, count}) => {
  return (
    <View style={styles.container} >

      <Text>{count}</Text>
    </View>
  )
}

export default ServiceImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
    }
})