import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import ServiceImage from '../../../components/app/ServiceImage';
import MiniButton from '../../../components/general/MiniButton';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../../assets/colors/colors';

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
      <View style={styles.backBtnStyles}>
          <MiniButton
              func = {backBtnClick}
              content ={<AntDesign name="arrowleft" size={24} color={colors.textDark} />}
          />
      </View>
      <Carousel
        loop
        width={width}
        autoPlay={false}
        data={imageArr}
        scrollAnimationDuration={4000}
        renderItem={({ item, index }) => (
          <ServiceImage imageData={item} count={index} backBtnClick={backBtnClick} />
        )}
      />
    </View>
  )
}

export default imagesSec

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  backBtnStyles: {
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 2,
  },
})