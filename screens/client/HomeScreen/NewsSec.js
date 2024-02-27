import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';

import { getNews } from '../../../assets/data/news';
import NewsSliderSingle from '../../../components/app/NewsSliderSingle'

const NewsSec = () => {
  const [news, setNews] = useState(null);
  const width = Dimensions.get('window').width;

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await getNews();
        setNews(data);
      } catch (error) {
        console.error('error at fetching news', error)
        setNews(null);
      }
    }
    getData()
  },[])

  const handleViewMoreClick = (clickedNewsId) => {
    console.log(clickedNewsId)
  }

  return (
    <View style={styles.container}>
      {(news && news.length > 0) && (
        <Carousel
          loop
          width={width}
          autoPlay={true}
          data={news}
          scrollAnimationDuration={4000}
          renderItem={({ item }) => (
            <NewsSliderSingle newsItem={item} handleViewMoreClick={handleViewMoreClick} />
          )}
        />
      )}
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