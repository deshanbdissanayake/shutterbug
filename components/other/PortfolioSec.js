import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Subtitle from '../app/Subtitle'
import NoData from '../app/NoData'
import ShowAll from '../app/ShowAll'

const PortfolioSec = ({ portfolio }) => {
  const [showAll, setShowAll] = useState(false);
  const maxItemsToShow = 4; // Change this value as desired

  const handleImageClick = () => {};

  return (
    <View style={styles.container}>
      <Subtitle text={'Photos'} />
      <View style={styles.imagesWrapper}>
        {
          portfolio && portfolio.length > 0 ? (
            portfolio.slice(0, showAll ? portfolio.length : maxItemsToShow).map((val, i) => (
              <TouchableOpacity style={[styles.imageWrapper, { paddingRight: i % 2 === 0 ? 5 : 0, paddingLeft: i % 2 === 0 ? 0 : 5 }]} onPress={handleImageClick} key={i}>
                <Image style={styles.imageStyles} source={{ uri: val.img }} />
              </TouchableOpacity>
            ))
          ) : (
            <NoData text='No Images'/>
          )
        }
      </View>
      {portfolio.length > maxItemsToShow && (
        <ShowAll showAll={showAll} setShowAll={setShowAll} />
      )}
    </View>
  )
}

export default PortfolioSec

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  imagesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    width: '50%',
    marginBottom: 10,
  },
  imageStyles: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
})
