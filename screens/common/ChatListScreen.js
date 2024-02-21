import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { chatListByUserId } from '../../assets/data/common/chat'
import ChatItem from '../../components/app/ChatItem'
import colors from '../../assets/colors/colors'

const ChatListScreen = () => {

  const handleChatClick = (chat_id) => {
    console.log('chat_id', chat_id)
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerTextStyles}>Inbox</Text>
      </View>
      <View style={styles.chatListWrapper}>
        <FlatList
          data={chatListByUserId}
          renderItem={({item}) => <ChatItem chatData={item} handleChatClick={handleChatClick} />}
          keyExtractor={(item) => item.chat_id.toString()}
        />
      </View>
    </View>
  )
}

export default ChatListScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTextStyles: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.textDark,
  },
  chatListWrapper: {
    marginTop: 20,
  },
})