import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { chatListByUserId } from '../../assets/data/common/chat'
import ChatItem from '../../components/app/ChatItem'

const ChatListScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTextStyles}></Text>
      </View>
      <View style={styles.chatListWrapper}>
        <FlatList
          data={chatListByUserId}
          renderItem={({item}) => <ChatItem chatData={item} />}
          keyExtractor={(item) => item.chat_id.toString()}
        />
      </View>
    </View>
  )
}

export default ChatListScreen

const styles = StyleSheet.create({

})