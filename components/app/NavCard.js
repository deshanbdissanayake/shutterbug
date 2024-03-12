import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import { AntDesign } from '@expo/vector-icons'

const NavCard = ({icon, title, func}) => {
  return (
    <TouchableOpacity onPress={func} style={styles.container}>
        <View style={styles.mainWrapper}>
            <View style={styles.iconWrapper}>
                {icon}
            </View>
            <Text style={styles.textStyles}>{title}</Text>
        </View>
        <AntDesign name="caretright" size={16} color={colors.textDark} style={styles.caretStyles} />
    </TouchableOpacity>
  )
}

export default NavCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrayExtraLight,
    }, 
    mainWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 11,
    },
    caretStyles: {
        flex: 1,
    },
    iconWrapper: {
        marginLeft: 10,
        marginRight: 20,
        flex: 1,
    }, 
    textStyles: {
        color: colors.textDark,
        fontSize: 16,
        flex: 11,
    },
})