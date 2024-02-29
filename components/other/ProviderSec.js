import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import MiniButton from '../general/MiniButton'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const ProviderSec = ({ p_id, p_img, fname, uname }) => {
  const navigation = useNavigation();

  const handleNavigateToProfile = (p_id) => {
    navigation.navigate('Provider Profile', { p_id });
  }

  return (
    <View style={styles.container}>
      <View style={styles.providerWrapper}>
        <Image source={{ uri: p_img }} style={styles.proPicStyles} />
        <View>
          <Text style={styles.fullNameTextStyles}>{fname}</Text> 
          <Text style={styles.userNameTextStyles}>{uname}</Text> 
        </View>
      </View>
      <View style={styles.btnWrapper}>
        <MiniButton 
          func = {() => handleNavigateToProfile(p_id)}
          content = {<AntDesign name="caretright" size={16} color={colors.textDark} />}
        />
      </View>
    </View>
  )
}

export default ProviderSec

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingVertical: 15,
    backgroundColor: colors.bgLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  providerWrapper: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  proPicStyles: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 50,
    marginRight: 10,
  },
  fullNameTextStyles: {
    fontSize: 14,
    fontWeight: '400',
  },
  userNameTextStyles: {
    fontSize: 12,
    color: colors.textGraySecondary,
  },
})