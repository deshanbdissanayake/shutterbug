import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import colors from '../../assets/colors/colors'

const ProviderServiceItem = ({serviceData, handleItemClick}) => {
  return (
    <TouchableOpacity onPress={() => handleItemClick(serviceData.s_id)} style={styles.container}>
        <Image style={styles.imageStyles} source={{ uri: serviceData.main_s_img }} />
        <View style={styles.textWrapper}>
            <Text style={styles.titleTextStyles} numberOfLines={2}>{serviceData.s_name}</Text>
            <Text style={styles.categoryTextStyles}>{serviceData.s_type} - {serviceData.cat_name}</Text>
            <Text style={styles.descTextStyles} numberOfLines={2}>{serviceData.s_desc}</Text>
            <View style={styles.bottomTextWrapper}>
                <View style={styles.ratingWrapper}>
                    <FontAwesome name="star" size={14} color={colors.gold} />
                    <Text style={styles.ratingTextStyles}>{serviceData.s_rating} | {serviceData.number_of_reviews}</Text>
                </View>
                <Text style={styles.priceTextStyles}>${serviceData.main_pkg_price}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default ProviderServiceItem

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrayExtraLight,
    },
    imageStyles: {
        flex: 1,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    textWrapper: {
        flex: 2,
        paddingLeft: 10,
        justifyContent: 'space-between',
    },
    titleTextStyles: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.textDark,
    },
    categoryTextStyles: {
        fontSize: 12,
        color: colors.textGraySecondary,
    },
    descTextStyles: {
        fontSize: 12,
        color: colors.textDark,
        textAlign: 'justify',
    },
    bottomTextWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingWrapper: {
        flexDirection: 'row',
    },
    ratingTextStyles: {
        marginLeft: 2,
        fontSize: 12,
        color: colors.textGraySecondary,
    },
    priceTextStyles: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.primary,
    },
})