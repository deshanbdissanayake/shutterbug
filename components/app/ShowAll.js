import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../assets/colors/colors'

const ShowAll = ({ showAll, setShowAll }) => {
  return (
    <TouchableOpacity style={styles.showMoreButton} onPress={() => setShowAll(!showAll)}>
        <Text style={styles.btnTextStyles}>{showAll ? 'Show Less' : 'Show More'}</Text>
        <MaterialIcons name={showAll ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} color={colors.textDark} />
    </TouchableOpacity>
  )
}

export default ShowAll

const styles = StyleSheet.create({
    showMoreButton: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextStyles: {
        color: colors.textDark,
    },
})