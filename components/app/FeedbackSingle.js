import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors/colors'
import { AntDesign } from '@expo/vector-icons';

const FeedbackSingle = ({ feedback }) => {
    const [showAll, setShowAll] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.infoWrapper}>
            <Image style={styles.imageStyles} source={{ uri: feedback.user_img }} />
            <View>
                <Text style={styles.nameTextStyles}>{ feedback.name }</Text>
                <Text style={styles.cityTextStyles}>{ feedback.city }</Text>
            </View>
        </View>
        <View style={styles.ratingWrapper}>
            <AntDesign name="star" size={14} color={colors.gold} style={styles.textShadowStyles} />
            <Text style={styles.ratingTextStyles}>{ parseFloat(feedback.rating).toFixed(1) }</Text>
        </View>
      </View>
      <View style={styles.middleWrapper}>
        <Pressable onPress={() => setShowAll(!showAll)}>
            <Text style={styles.reviewTextStyles} numberOfLines={showAll ? undefined : 3}>{ feedback.review }</Text>
        </Pressable>
      </View>
      <View style={styles.bottomWrapper}>
        <Text style={styles.timeTextStyles}>{ feedback.time }</Text>
      </View>
    </View>
  )
}

export default FeedbackSingle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrayExtraLight,
        paddingVertical: 10,
    },
    topWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    middleWrapper: {
        marginTop: 5,
    },
    bottomWrapper: {
        marginTop: 5,
        alignItems: 'flex-end',
    },
    infoWrapper: {
        flexDirection: 'row',
    },
    imageStyles: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 50,
        marginRight: 10,
    },
    nameTextStyles: {
        fontWeight: '500',
        color: colors.textDark,
    },
    cityTextStyles: {
        fontSize: 12,
        color: colors.textGraySecondary,
    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.borderGrayLight,
        borderRadius: 25,
    },
    textShadowStyles: {
        textShadowRadius: 1,
        textShadowColor: colors.textGray,
        marginRight: 5,
    },
    ratingTextStyles: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.textDark,
    },
    reviewTextStyles: {
        color: colors.textDark,
        textAlign: 'justify',
    },
    timeTextStyles: {
        fontSize: 12,
        color: colors.textGraySecondary,
    },
})