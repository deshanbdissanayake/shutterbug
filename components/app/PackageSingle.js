import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors/colors'
import { FontAwesome } from '@expo/vector-icons'

const PackageSingle = ({ pkg, selectedPkg, handlePackageSelect, isClient }) => {
    return (
        <Pressable onPress={() => handlePackageSelect(pkg.pkg_id)}>
            <View style={[styles.container, (isClient && selectedPkg === pkg.pkg_id) ? styles.selectedPkgStyles : null]}>
                <View style={styles.topWrapper}>
                    <Text style={styles.titleTextStyles} numberOfLines={1}>{pkg.pkg_name}</Text>
                    {(isClient && selectedPkg === pkg.pkg_id) ? (
                        <Text style={styles.selectedPkgTextStyles}>Selected</Text>
                    ) : null}
                </View>
                <View style={styles.bottomWrapper}>
                    <View style={styles.highlightWrapper}>
                        <View style={styles.hilightItemWrapper}>
                            <FontAwesome name="circle" size={10} color="black" />
                            <Text style={styles.highlightTextStyles} numberOfLines={1}> {pkg.highlight_1}</Text>
                        </View>
                        <View style={styles.hilightItemWrapper}>
                            <FontAwesome name="circle" size={10} color="black" />
                            <Text style={styles.highlightTextStyles} numberOfLines={1}> {pkg.highlight_2}</Text>
                        </View>
                        <View style={styles.hilightItemWrapper}>
                            <FontAwesome name="circle" size={10} color="black" />
                            <Text style={styles.highlightTextStyles} numberOfLines={1}> {pkg.highlight_3}</Text>
                        </View>
                    </View>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.priceTextStyles}>${pkg.pkg_price}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default PackageSingle

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        backgroundColor: colors.bgLight,
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: 260,
        height: 120,
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    topWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleTextStyles:{
        fontSize: 16,
        fontWeight: '500',
        color: colors.textDark,
    },
    bottomWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    highlightWrapper:{
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    hilightItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },
    highlightTextStyles:{
        marginLeft: 5,
        fontSize: 12,
        color: colors.textDark,
    },
    priceWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    priceTextStyles: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.primary,
    },
    selectedPkgStyles: {
        borderWidth: 2,
        borderColor: colors.primary
    },
    selectedPkgTextStyles: {
        backgroundColor: colors.primary,
        color: colors.textLight,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 7,
    },
})