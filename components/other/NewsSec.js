import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';

import { getNews } from '../../assets/data/news';
import NewsSliderSingle from '../app/NewsSliderSingle'
import { useNavigation } from '@react-navigation/native'

const NewsSec = () => {
  const navigation = useNavigation();
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

  const handleViewMoreClick = (news_id) => {
    navigation.navigate('News Single', { news_id });
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