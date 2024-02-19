import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import ServiceImage from '../../../components/app/ServiceImage';

const imagesSec = ({ imageArr }) => {
  const width = Dimensions.get('window').width;

  const singleImageView = (imageId) => {
    console.log(imageId)
  }

  const backBtnClick = () => {
    console.log('back clicked')
  }

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        autoPlay={true}
        data={imageArr}
        scrollAnimationDuration={4000}
        renderItem={({ item, index }) => (
          <ServiceImage imageData={item} count={index} />
        )}
      />
    </View>
  )
}

export default imagesSec

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    height: 100,
  }
})