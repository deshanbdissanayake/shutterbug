import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Subtitle from '../app/Subtitle'
import colors from '../../assets/colors/colors';

const InfoSec = ({ title, description, showAllStt = false }) => {
  const [showAll, setShowAll] = useState(showAllStt);
  return (
    <View style={styles.container}>
        <Subtitle text={title} />
        <Pressable onPress={() => setShowAll(!showAll)}>
          <Text style={styles.descStyles} numberOfLines={!showAll ? 3 : null}>{description}</Text>
        </Pressable>
    </View>
  )
}

export default InfoSec

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  descStyles: {
    color: colors.textDark,
    textAlign: 'justify',
  },
})