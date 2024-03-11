import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import MiniButton from '../general/MiniButton'
import { AntDesign } from '@expo/vector-icons'

const Header = ({text, handleGoBack = null}) => {
  return (
    <View style={styles.headerWrapper}>
      {handleGoBack && (
        <View style={styles.btnWrapper}>
          <MiniButton
            func={handleGoBack}
            content={<AntDesign name="arrowleft" size={24} color={colors.textDark} />}
          />
        </View>
      )}
      <Text style={styles.headerTextStyles}>{text}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  btnWrapper: {
    marginRight: 10,
  },
  headerTextStyles: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.textDark,
  },
})