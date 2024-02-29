import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons/build/Icons'
import MiniButton from '../general/MiniButton'
import colors from '../../assets/colors/colors'

const HeaderSec = ({title, desc, handleMoreClick}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeTextStyles}>{title}</Text>
        <Text style={styles.locationTextStyles}>{desc}</Text>
      </View>
      <View>
        <MiniButton
          func = {handleMoreClick}
          content = {<Entypo name="dots-three-vertical" size={24} />}
        />
      </View>
    </View>
  )
}

export default HeaderSec

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTextStyles: {
    fontSize: 32,
    fontFamily: 'impact-font',
    color: colors.primary,
  },
  locationTextStyles: {
    fontSize: 16,
    color: colors.textDark,
  },
})