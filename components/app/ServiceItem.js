import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../assets/colors/colors'

const ServiceItem = ({ service }) => {
    const mainImage = service.s_images.find((imgData) => imgData.is_main === 1);
    const mainPackage = service.packages.find((pkgData) => pkgData.is_main === 1);
    const imageSource = mainImage ? { uri: mainImage.img } : null;

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image 
                    source={imageSource} 
                    style={styles.imageStyles} 
                />
            </View>
            <View style={styles.detailsWrapper}>
                <Text style={styles.titleTextStyles}>{service.s_name}</Text>
                <Text style={styles.nameTextStyles}>{service.provider_name}</Text>
                <View style={styles.bottomTextWrapper}>
                    <Text style={styles.priceTextStyles}>
                        ${mainPackage ? mainPackage.pkg_price : '-'}
                    </Text>
                    <View style={styles.ratingWrapper}>
                        <AntDesign name="star" size={24} color={colors.gold} style={styles.textShadowStyles} /> 
                        <Text style={styles.ratingTextStyles}>{service.s_rating}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ServiceItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 130,
        backgroundColor: colors.bgLight,
        marginBottom: 10,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    textShadowStyles: {
        textShadowRadius: 1,
        textShadowColor: colors.textGray,
    },
    imageWrapper: {
        flex: 2,
        justifyContent: 'center',
    },
    detailsWrapper: {
        flex: 3,
    },
    imageStyles: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    titleTextStyles: {

    },
    nameTextStyles: {

    },
    bottomTextWrapper: {

    },
    priceTextStyles: {

    },
    ratingWrapper: {

    },
    ratingTextStyles: {
        color: colors.textGraySecondary,
    },
})