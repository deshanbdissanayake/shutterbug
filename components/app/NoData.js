import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const NoData = ({text = 'No Data'}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>{text}</Text>
    </View>
  )
}

export default NoData

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: colors.borderGrayExtraLight,
        marginBottom: 10,
    },
    textStyles: {
        fontWeight: '400',
        fontSize: 14,
        color: colors.textDark,
        textAlign: 'center',
    },
})