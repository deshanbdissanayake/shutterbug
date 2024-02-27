import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../../assets/colors/colors'
import MiniButton from '../../../components/general/MiniButton'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const providerSec = ({ provider }) => {
  const navigation = useNavigation();

  const handleNavigateToProfile = (p_id) => {
    navigation.navigate('Provider Profile', { p_id });
  }

  return (
    <View style={styles.container}>
      <View style={styles.providerWrapper}>
        <Image source={{ uri: provider.pro_pic }} style={styles.proPicStyles} />
        <View>
          <Text style={styles.fullNameTextStyles}>{provider.fullname}</Text> 
          <Text style={styles.userNameTextStyles}>{provider.username}</Text> 
        </View>
      </View>
      <View style={styles.btnWrapper}>
        <MiniButton 
          func = {() => handleNavigateToProfile(provider.p_id)}
          content = {<AntDesign name="caretright" size={16} color={colors.textDark} />}
        />
      </View>
    </View>
  )
}

export default providerSec

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingVertical: 15,
    backgroundColor: colors.bgLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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