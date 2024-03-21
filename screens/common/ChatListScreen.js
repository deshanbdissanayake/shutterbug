import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { chatListByUserId } from '../../assets/data/chat'
import ChatItem from '../../components/app/ChatItem'
import Header from '../../components/app/Header'
import NoData from '../../components/app/NoData'
import colors from '../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'

const ChatListScreen = () => {
  const navigation = useNavigation();

  const [chatList, setChatList] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await chatListByUserId();
        setChatList(data);
      } catch (error) {
        console.log('Error fetching chats:', error);
        setChatList(null);
      }
    };
    getData();
    
  }, []);

  //=================================================================

  const handleChatClick = (chat_data) => {
    navigation.navigate('Single Chat', {chat_data})
  }

  return (
    <View style={styles.container}>
        <Header text={'Inbox'}/>
        {(chatList && chatList.length > 0) ? (
          <FlatList
            data={chatList}
            renderItem={({item}) => <ChatItem chatData={item} handleChatClick={handleChatClick} />}
            keyExtractor={(item) => item.chat_id.toString()}
          />
        ) : (
          <NoData text='No Chats' />
        )}
    </View>
  )
}

export default ChatListScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
})