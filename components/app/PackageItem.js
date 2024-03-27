import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import MiniButton from '../general/MiniButton'

const PackageItem = ({ pkgData, deleteFunc }) => {

    const handleDeleteClick = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this package?', [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Delete', onPress: () => deleteFunc(pkgData.pkg_id)}
        ])
    }
    return (
        <View style={styles.container}>
            <View style={styles.pkgNameWrapper}>
                <Text style={styles.pkgNameTextStyles}>{pkgData.pkg_name}</Text>
                {pkgData.is_main == 1 && (
                    <Text style={styles.pkgTypeTextStyles}>Main Package</Text>
                )}
            </View>
            <Text style={styles.pkgDescTextStyles}>{pkgData.pkg_desc}</Text>
            <Text style={styles.pkgPriceTextStyles}>${pkgData.pkg_price}</Text>
            <View style= {styles.bottomWrapper}>
                <View style={styles.highlightWrapper}>
                    <Text style={styles.pkgHLTextStyles}>
                        <MaterialCommunityIcons name="star-four-points" size={14} color={colors.textDark} />
                        &nbsp;{pkgData.highlight_1}
                    </Text>
                    <Text style={styles.pkgHLTextStyles}>
                        <MaterialCommunityIcons name="star-four-points" size={14} color={colors.textDark} />
                        &nbsp;{pkgData.highlight_2}
                    </Text>
                    <Text style={styles.pkgHLTextStyles}>
                        <MaterialCommunityIcons name="star-four-points" size={14} color={colors.textDark} />
                        &nbsp;{pkgData.highlight_3}
                    </Text>
                </View>
                <MiniButton
                    func={handleDeleteClick}
                    content={<FontAwesome name="trash" size={24} color={colors.danger} />}
                />
            </View>
        </View>
    )
}

export default PackageItem

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.bgLight,
        marginBottom: 10,
        borderRadius: 10,
    },
    pkgNameWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    pkgNameTextStyles: {
        fontSize: 16,
        color: colors.textDark,
        fontWeight: '400',
    },
    pkgTypeTextStyles: {
        backgroundColor: colors.white,
        color: colors.textDark,
        fontWeight: '300',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    pkgDescTextStyles: {
        color: colors.textDark,
        fontWeight: '300',
    },
    pkgPriceTextStyles: {
        fontSize: 20,
        color: colors.primary,
        fontWeight: '400',
        marginTop: 5,
        marginBottom: 2,
    },
    highlightWrapper: {
        borderTopWidth: 1,
        borderTopColor: colors.borderGrayExtraLight,
        paddingTop: 5,
        marginTop: 5,
    },
    pkgHLTextStyles: {
        color: colors.textDark,
        fontWeight: '300',
        marginBottom: 2,
    },
    bottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    }
    
})