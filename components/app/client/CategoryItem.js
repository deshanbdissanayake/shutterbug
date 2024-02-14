import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React from 'react'
import colors from '../../../assets/colors/colors'

const CategoryItem = ({cat, handleCategoryClick}) => {
  return (
    <TouchableOpacity onPress={() => handleCategoryClick(cat.id)}>
        <View style={styles.container}>
            <Image source={{ uri: cat.image }} style={styles.imageStyles} />
            <Text style={styles.catTextStyles} numberOfLines={1}>{cat.name}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.borderGrayLight,
        margin: 1,
    },
    imageStyles: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
    },
    catTextStyles: {
        marginTop: 5,
        color: colors.textGraySecondary,
    },
})