import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../../assets/colors/colors'
import NewsSliderSingle from '../../../components/app/client/NewsSliderSingle'

const NewsSec = () => {
  return (
    <View style={styles.container}>
      {/* add slider here */}
      <NewsSliderSingle/>
    </View>
  )
}

export default NewsSec

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
})