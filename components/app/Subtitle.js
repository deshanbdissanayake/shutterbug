import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const Subtitle = ({ text }) => {
  return (
    <Text style={styles.textStyles}>{text}</Text>
  )
}

export default Subtitle

const styles = StyleSheet.create({
    textStyles: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.textDark,
        marginBottom: 10,
    }
})