import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, BackHandler  } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import colors from '../../assets/colors/colors';
import MiniButton from '../../components/general/MiniButton';
import Input from '../../components/general/Input';
import ChatMessageItem from '../../components/app/ChatMessageItem';
import { chatMessagesByChatId, chatDataByChatId } from '../../assets/data/chat'; // Assuming you have a function to fetch chat messages
import NoData from '../../components/app/NoData';
import * as DocumentPicker from 'expo-document-picker';
import LoadingScreen from '../LoadingScreen';

const ChatSingleScreen = ({chat_id}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const flatListRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [chatData, setChatData] = useState(null)
  const [numberOfMsgs, setNumberOfMsgs] = useState(50);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFileURI, setSelectedFileURI] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('');
  const [isAtTop, setIsAtTop] = useState(false); // Track if user is at the top of the messages

  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchData = async () => {
    try {
      const chatDataResult = await chatDataByChatId(chat_id);
      const messagesDataResult = await chatMessagesByChatId(chat_id, numberOfMsgs);
  
      setChatData(chatDataResult);
      setMessages(messagesDataResult);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [numberOfMsgs]);  

  const selectedFileRemoveFunc = () => {
    setSelectedFileType('');
    setSelectedFileURI('');
  };

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow any type of file to be picked
        copyToCacheDirectory: false, // Don't copy the file to app's cache directory
      });
  
      if (!result.canceled) {
        // Handle the selected file, for example, you can log its URI
        setSelectedFileURI(result.assets[0].uri);
        const fileType = result.assets[0].mimeType.split('/')[0];
        setSelectedFileType(fileType)
      } else {
        // User canceled the file picking
        console.log('File picking canceled');
      }
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  };

  const handleSendMessage = () => {
    // Implement sending message functionality
  };

  const loadMoreMessages = () => {
    setNumberOfMsgs(numberOfMsgs + 50);
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setIsAtTop(contentOffset.y <= 0);
  };

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatHeaderWrapper}>
        <View style={styles.chatImageWrapper}>
          <MiniButton func={handleGoBack} content={<AntDesign name="arrowleft" size={24} color={colors.textLight} />} />
          <Image style={styles.chatImageStyles} source={{ uri: chatData.chat_user_img }} />
        </View>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.nameTextStyles} numberOfLines={1}>
            {chatData.chat_user_name}
          </Text>
          <Text style={styles.jobTextStyles} numberOfLines={2}>
            {chatData.service} ({chatData.pkg} package)
          </Text>
        </View>
      </View>
      <View style={styles.chatBodyWrapper}>
        {(messages && messages.length > 0) ? (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => <ChatMessageItem msgData={item} sender={chatData.chat_user_name} />}
            keyExtractor={(item) => item.msgId}
            initialScrollIndex={messages.length - 1}
            getItemLayout={(data, index) => ({
              length: 100,
              offset: 100 * index,
              index
            })}
            onScrollToIndexFailed={(info) => {
              console.warn('Failed to scroll to index:', info.index);
            }}
            onScroll={handleScroll}
            onEndReached={loadMoreMessages}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isAtTop && <ActivityIndicator />}
            contentContainerStyle={styles.msgListStyles}
          />
        ) : (
          <NoData text={`Start a conversation with ${chatData.chat_user_name}`} />
        )}
        <View style={styles.inputSecWrapper}>
          {selectedFileURI !== '' && (
            <View>
              <TouchableOpacity onPress={selectedFileRemoveFunc} style={styles.closeWrapper}>
                <FontAwesome name="times" size={24} color={colors.textDark} />
              </TouchableOpacity>
              {
                selectedFileType === 'image' ? (
                  <Image source={{ uri: selectedFileURI }} style={styles.selectedFileStyles} />
                ) : (
                  <View style={styles.selectedFileStyles}>
                    <FontAwesome5 name="file-alt" size={70} color={colors.textDark} />
                    <Text style={styles.selectedFileTextStyles}>Document selected to send</Text>
                  </View>
                )
              }
            </View>
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
  },
  msgListStyles: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  newMsgWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  inputSecWrapper: {
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.white, 
    borderTopWidth: 1,
    borderTopColor: colors.bgLight,
  },
  inputWrapper: {
    flex: 7,
    backgroundColor: colors.white,
    borderRadius: 10,
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
    backgroundColor: colors.bgLight,
  },
  selectedFileStyles: {
    width: '100%', 
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.infoLight,
  },
  selectedFileTextStyles: {
    color: colors.textDark,
    marginTop: 15,
  },
  closeWrapper: {
    position: 'absolute',
    top: 25,
    right: 5,
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 5,
    zIndex: 2,
    borderRadius: 5,
  },
});

export default ChatSingleScreen;
