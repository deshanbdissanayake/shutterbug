import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const MiniButton = ({bgColor, func, content}) => {
  return (
    <TouchableOpacity onPress={func}>
        <View style={[styles.miniButtonStyles, {backgroundColor: bgColor}]}>
            {content}
        </View>
    </TouchableOpacity>
  )
}

export default MiniButton

const styles = StyleSheet.create({
    miniButtonStyles: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: 'red'
    },
})