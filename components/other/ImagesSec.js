import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import ServiceImage from '../app/ServiceImage';
import MiniButton from '../general/MiniButton';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../assets/colors/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'

const ImagesSec = ({ imageArr, handleGoBack }) => {
  const navigation = useNavigation();

  const width = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(1);

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
                func={handleGoBack}
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
    top: 20,
    left: 0,
    zIndex: 2,
    width: '100%',
    paddingHorizontal: 15,
  },
  background: {
    width: '100%',
    height: 80,
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
