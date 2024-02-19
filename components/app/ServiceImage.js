import { Image, StyleSheet, View } from 'react-native'
import React from 'react'

const ServiceImage = ({ imageData, count}) => {
  return (
    <View style={styles.container} >
        <Image source={{ uri: imageData.img }} style={styles.serviceImageStyles} />
    </View>
  )
}

export default ServiceImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    serviceImageStyles: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
})