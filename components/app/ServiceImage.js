import { Image, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'


const ServiceImage = ({ imageData, onImageClick }) => {
  return (
    <View style={styles.container} >
      <Pressable onPress={() => onImageClick(imageData.si_id)}>
        <Image source={{ uri: imageData.img }} style={styles.serviceImageStyles} />
      </Pressable>
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