import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const Header = ({text}) => {
  return (
    <Text style={styles.headerTextStyles}>{text}</Text>
  )
}

export default Header

const styles = StyleSheet.create({
  headerTextStyles: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: 20
  },
})