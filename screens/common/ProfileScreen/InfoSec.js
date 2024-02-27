import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Subtitle from '../../../components/app/Subtitle'
import colors from '../../../assets/colors/colors';

const InfoSec = ({ description }) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <View style={styles.container}>
        <Subtitle text={'About Me'} />
        <Pressable onPress={() => setShowAll(!showAll)}>
          <Text style={styles.descStyles} numberOfLines={!showAll ? 3 : null}>{description}</Text>
        </Pressable>
    </View>
  )
}

export default InfoSec

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  descStyles: {
    color: colors.textDark,
    textAlign: 'justify',
  },
})