import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const NewsSliderSingle = ({ newsItem , handleViewMoreClick }) => {
  return (
    <View style={styles.container}>
        <Image source={{ uri: newsItem.image }} style={styles.newsImageStyles} />
          <View style={styles.textWrapper}>
            <Text style={[styles.newsTitleStyles, styles.textShadowStyles]} numberOfLines={1}>{newsItem.title}</Text>
            <Text style={[styles.newsSubTitleStyles, styles.textShadowStyles]} numberOfLines={1}>{newsItem.sub_title}</Text>
            <Text style={[styles.newsDescStyles, styles.textShadowStyles]} numberOfLines={2}>{newsItem.news}</Text>
          </View>
          <TouchableOpacity style={styles.viewMoreWrapper} onPress={() => handleViewMoreClick(newsItem.id)}>
            <Text style={styles.viewMoreTextStyles}>View More</Text>
          </TouchableOpacity>
    </View>
  )
}

export default NewsSliderSingle

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  newsImageStyles: {
    width: '92%',
    height: 130,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textWrapper: {
    position: 'absolute',
    top:8,
    left: 30,
    justifyContent: 'space-between',
    width: '50%',
  },
  viewMoreWrapper: {
    position: 'absolute',
    bottom: 15,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  newsTitleStyles: {
    fontFamily: 'impact-font',
    fontSize: 36,
    color: colors.textLight,
  },
  newsSubTitleStyles: {
    fontSize: 16,
    color: colors.textLight,
  },
  newsDescStyles: {
    fontSize: 12,
    color: colors.textLight,
  },
  textShadowStyles: {
    textShadowRadius: 2,
    textShadowColor: colors.black,
  },
  viewMoreTextStyles: {
    fontSize: 14,
    color: colors.textLight,
  },
})