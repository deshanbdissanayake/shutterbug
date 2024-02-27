import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MiniButton from '../../../components/general/MiniButton'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'

const ProfileSec = ({ p_id, pro_pic, fullname, username, p_ratings, number_of_reviews }) => {

  const navigation = useNavigation();

  const handleBackClick = () => {
    navigation.goBack()
  }

  const handleChatClick = (p_id) => {
    navigation.navigate('Provider Chat', { p_id })
  }

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.leftWrapper}>
          <MiniButton
            func={handleBackClick}
            content={<AntDesign name="arrowleft" size={24} color={colors.textDark} />}
          />
        </View>
        <View style={styles.middleWrapper}>
          <View style={styles.imageWrapper}>
            <Image style={styles.imageStyles} source={{ uri: pro_pic}} />
          </View>
        </View>
        <View style={styles.rightWrapper}>
            <TouchableOpacity style={styles.contactWrapper} onPress={() => handleChatClick(p_id)}>
              <Text style={styles.contactStyles}>Contact</Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomWrapper}>
          <Text style={styles.nameStyles}>{fullname}</Text>
          <Text style={styles.unStyles}>@{username}</Text>
          <View style={styles.reviewWrapper}>
            <AntDesign name="star" size={14} color={colors.gold} style={styles.textShadowStyles} />
            <Text style={styles.ratingStyles}>{p_ratings}</Text>
            <Text style={styles.reviewStyles}>({number_of_reviews})</Text>
          </View>
      </View>
    </View>
  )
}

export default ProfileSec

const styles = StyleSheet.create({

  container: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGrayExtraLight,
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomWrapper: {
    alignItems: 'center',
  },
  leftWrapper: {
    flex: 2,
  },
  middleWrapper: {
    flex: 4,
  },
  rightWrapper: {
    flex: 2,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageStyles: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  contactWrapper: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.textDark,
    borderRadius: 5,
  },
  contactStyles: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: colors.textDark,
  },
  nameStyles: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textDark,
  },
  unStyles: {
    fontSize: 12,
    color: colors.textGray,
  },
  reviewWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingStyles: {
    marginRight: 5,
    fontWeight: '500',
    color: colors.textDark,
  },
  reviewStyles: {
    marginRight: 5,
    color: colors.textDark,
  },
  textShadowStyles: {
    textShadowRadius: 1,
    textShadowColor: colors.textGray,
    marginRight: 5,
  },

})