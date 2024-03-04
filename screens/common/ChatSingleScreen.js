import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import colors from '../../assets/colors/colors';
import MiniButton from '../../components/general/MiniButton';
import Input from '../../components/general/Input';
import ChatMessageItem from '../../components/app/ChatMessageItem';
import { chatMessagesByChatId } from '../../assets/data/chat'; // Assuming you have a function to fetch chat messages
import NoData from '../../components/app/NoData';

const ChatSingleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef(null);
  const chat_data = route.params?.chat_data || ''; // Using optional chaining for safety

  const [numberOfMsgs, setNumberOfMsgs] = useState(50);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [isAtTop, setIsAtTop] = useState(false); // Track if user is at the top of the messages

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleFileSelect = () => {
    // Implement handle File Select functionality
  };

  const handleSendMessage = () => {
    // Implement sending message functionality
  };

  const getData = async (chatId, numberOfMsgs) => {
    try {
      const data = await chatMessagesByChatId(chatId, numberOfMsgs);
      setMessages(data);
      flatListRef.current.scrollToEnd(); // Scroll to the end after loading messages
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    getData(chat_data.chat_id, numberOfMsgs);
  }, [numberOfMsgs]);

  const loadMoreMessages = () => {
    setNumberOfMsgs(numberOfMsgs + 50);
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setIsAtTop(contentOffset.y <= 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatHeaderWrapper}>
        <View style={styles.chatImageWrapper}>
          <MiniButton func={handleGoBack} content={<AntDesign name="arrowleft" size={24} color={colors.textLight} />} />
          <Image style={styles.chatImageStyles} source={{ uri: chat_data.chat_user_img }} />
        </View>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.nameTextStyles} numberOfLines={1}>
            {chat_data.chat_user_name}
          </Text>
          <Text style={styles.jobTextStyles} numberOfLines={2}>
            {chat_data.service} ({chat_data.pkg} package)
          </Text>
        </View>
      </View>
      <View style={styles.chatBodyWrapper}>
        {(messages && messages.length > 0) ? (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => <ChatMessageItem msgData={item} />}
            keyExtractor={(item) => item.msgId}
            onScroll={handleScroll}
            onEndReached={loadMoreMessages}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isAtTop && <ActivityIndicator />}
          />
        ) : (
          <NoData text={`Start a conversation with ${chat_data.chat_user_name}`} />
        )}
        <View style={styles.newMsgWrapper}>
          <View style={styles.inputWrapper}>
            <Input
              keyboardType="default"
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Message"
              icon={<MiniButton
                content={<Entypo name="attachment" size={24} color={colors.primary}/>}
                func={handleFileSelect}
                paddingStt={false}
              />}
            />
          </View>
          <TouchableOpacity onPress={handleSendMessage} style={styles.btnWrapper}>
            <Feather name="send" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  chatHeaderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  chatImageWrapper: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatImageStyles: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  headerTextWrapper: {
    flex: 7,
  },
  nameTextStyles: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textLight,
  },
  jobTextStyles: {
    fontSize: 12,
    color: colors.textLight,
  },
  chatBodyWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  newMsgWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  inputWrapper: {
    flex: 7,
  },
  btnWrapper: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default ChatSingleScreen;
