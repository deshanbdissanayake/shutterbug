import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../assets/colors/colors'

const ServiceItem = ({ 
    handleServiceItemClick,
    s_id,
    s_rating,
    number_of_reviews,
    provider_name = null,
    s_name,
    s_type,
    main_pkg_price,
    main_s_img
}) => {
    return (
        <TouchableOpacity onPress={() => handleServiceItemClick(s_id)} style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image 
                    source={{ uri: main_s_img }} 
                    style={styles.imageStyles} 
                />
            </View>
            <View style={styles.detailsWrapper}>
                <View>
                    <Text style={styles.titleTextStyles} numberOfLines={2}>{s_name}</Text>
                    { provider_name && (
                        <Text style={styles.nameTextStyles} numberOfLines={1}>{provider_name}</Text>
                    )}
                    <View style={styles.ratingWrapper}>
                        <AntDesign name="star" size={12} color={colors.gold} style={styles.textShadowStyles} /> 
                        <Text style={styles.ratingTextStyles}>{s_rating} | {number_of_reviews}</Text>
                    </View>
                </View>
                <View style={styles.bottomTextWrapper}>
                    <View style={styles.priceTextWrapper}>
                        <Text style={styles.priceTextStyles}></Text>
                        <Text style={styles.priceStyles}>
                            ${main_pkg_price}
                        </Text>
                    </View>
                    <Text style={styles.categoryTextStyle}>{s_type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ServiceItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 130,
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrayExtraLight,
    },
    textShadowStyles: {
        textShadowRadius: 1,
        textShadowColor: colors.textGray,
        marginRight: 5,
    },
    imageWrapper: {
        flex: 2,
        justifyContent: 'center',
        paddingRight: 15,
    },
    detailsWrapper: {
        flex: 3,
        justifyContent: 'space-between'
    },
    imageStyles: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    nameTextStyles: {
        fontSize: 12,
        color: colors.textGraySecondary,
    },
    titleTextStyles: {
        fontSize: 16,
        color: colors.textDark,
    },
    bottomTextWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceTextWrapper: {
        flexDirection: 'row',
    },
    priceTextStyles: {

    },
    priceStyles: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: '400',
    },
    ratingWrapper: {
        flexDirection: 'row',
        marginTop: 5,
    },
    ratingTextStyles: {
        color: colors.textGraySecondary,
        fontSize: 10,
    },
    categoryTextStyle: {
        backgroundColor: colors.bgLight,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 12,
        color: colors.textGraySecondary,
        borderRadius: 5,
    },
})