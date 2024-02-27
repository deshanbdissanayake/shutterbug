import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import ServiceImage from '../../../components/app/ServiceImage';
import MiniButton from '../../../components/general/MiniButton';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../../assets/colors/colors';
import { LinearGradient } from 'expo-linear-gradient';

const ImagesSec = ({ imageArr }) => {
  const width = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(1);

  const backBtnClick = () => {
    console.log('back clicked')
  }

  const onImageClick = (img_id) => {
    console.log(img_id)
    //single image view
  }

  return (
    <View style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          style={styles.background}
        />
        <View style={styles.backBtnStyles}>
            <MiniButton
                func={backBtnClick}
                content={<AntDesign name="arrowleft" size={24} color={colors.textLight} />}
            />
        </View>
        <Carousel
          loop
          width={width}
          autoPlay={false}
          data={imageArr}
          scrollAnimationDuration={250}
          onSnapToItem={(index) => setCurrentIndex(index + 1)}
          renderItem={({ item }) => (
            <ServiceImage imageData={item} onImageClick={onImageClick} />
          )}
        />
        <View style={styles.countTextWrapper}>
          <Text style={styles.countTextStyles}>{currentIndex}/{imageArr.length}</Text>
        </View>
    </View>
  )
}

export default ImagesSec;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  backBtnStyles: {
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 2,
    width: '100%'
  },
  background: {
    width: '100%',
    height: 70,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  countTextWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: colors.bgDark,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countTextStyles: {
    color: colors.textLight,
    fontWeight: '600',
  },
})
