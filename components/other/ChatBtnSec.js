import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'

const ChatBtnSec = ({p_id, p_img}) => {
  const navigation = useNavigation();

  const handleChatPress = (p_id) => {
    navigation.navigate('Single Chat', { p_id })
  }

  return (
    <TouchableOpacity onPress={() => handleChatPress(p_id)} style={styles.chatTextWrapper}>
        <Image source={{ uri: p_img }} style={styles.chatImageStyles} />
        <Text style={styles.chatTextStyles }>Chat</Text>
    </TouchableOpacity>
  )
}

export default ChatBtnSec

const styles = StyleSheet.create({
    chatTextWrapper: {
        zIndex: 5,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingVertical: 5,
        paddingLeft: 5,
        paddingRight: 10,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
      },
      chatImageStyles: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 50,
        marginRight: 10,
      },
      chatTextStyles: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.textDark,
      },
})