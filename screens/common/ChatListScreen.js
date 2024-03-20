import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { chatListByUserId } from '../../assets/data/chat'
import ChatItem from '../../components/app/ChatItem'
import Header from '../../components/app/Header'
import NoData from '../../components/app/NoData'
import colors from '../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'
import { collection, getDocs, getFirestore, addDoc } from "firebase/firestore"; 
import db from '../../assets/store/firestore'

const ChatListScreen = () => {
  const navigation = useNavigation();
  const firestore = getFirestore();
  const chatCollection = collection(firestore, 'chat'); 

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
  
    const getFirestoreData = async () => {
      try {
        const querySnapshot = await getDocs(chatCollection);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Firestore datsa:', data);
      } catch (error) {
        console.log('Error fetching Firestore data:', error);
      }
    };
  
    getData();
    getFirestoreData();
    
    setFirestoreData();
  }, []);
  
  //this function should come in single chat
  const setFirestoreData = async () => {
    const data = {
      c_date: 'March 4, 2024 at 12:00:00 AM UTC+5:30',
      chatId: 1, 
      msgId: 2, 
      msgText: 'hi',
      receiverId: 2, 
      senderId: 1, 
      status: 'active'
    };
  
    try {
      await addDoc(chatCollection, data);
      console.log('Added');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
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