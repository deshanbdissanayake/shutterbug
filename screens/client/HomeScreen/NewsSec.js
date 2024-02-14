import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-reanimated-carousel';

import colors from '../../../assets/colors/colors'
import { getAllNews } from '../../../assets/data/client/news';
import NewsSliderSingle from '../../../components/app/client/NewsSliderSingle'

const NewsSec = () => {
  const width = Dimensions.get('window').width;

  const handleViewMoreClick = (clickedNewsId) => {
    console.log(clickedNewsId)
  }

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        autoPlay={true}
        data={getAllNews}
        scrollAnimationDuration={4000}
        renderItem={({ item }) => (
          <NewsSliderSingle newsItem={item} handleViewMoreClick={handleViewMoreClick} />
        )}
      />
    </View>
  )
}

export default NewsSec

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
})