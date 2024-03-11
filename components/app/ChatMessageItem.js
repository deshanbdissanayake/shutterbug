import React from 'react';
import { Image, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import colors from '../../assets/colors/colors';
import { useNavigation } from '@react-navigation/native'

const ChatMessageItem = ({ msgData, sender }) => {
  const navigation = useNavigation();
  const user_id = 1; // Assume user ID retrieval from async storage

  const isCurrentUser = msgData.msgBy === user_id;
  const bgColor = isCurrentUser ? colors.infoLight : colors.warningLight;
  const checkmarkColor = isCurrentUser && msgData.readStt ? colors.primary : colors.textGray;

  const handleDownload = (fileUrl) => {
    // Open the file URL in the default browser or file viewer
    Linking.openURL(fileUrl);
  };

  const handleOfferClick = () => {
    navigation.navigate('Custom Offer', msgData.msgText.offer_id);
  }

  if( msgData.msgType === 'offer' ){
    
    let msgText = ''
    let showLink = false;
    let offer_stt = msgData.msgText.offer_stt;
    let offerBgColor = offer_stt == 'pending' ? bgColor : offer_stt == 'confirm' ? colors.successLight : colors.dangerLight;

    if(isCurrentUser){
      if(offer_stt == 'pending'){
        msgText = 'You have sent an offer';
        showLink = true;
      }else if(offer_stt == 'confirm'){
        msgText = sender + ' has Accepted your offer';
        showLink = true;
      }else{
        msgText = sender + ' has Rejected this offer';
        showLink = false;
      }
    }else{
      if(offer_stt == 'pending'){
        msgText = sender + ' has sent an offer';
        showLink = true;
      }else if(offer_stt == 'confirm'){
        msgText = 'You have Accepted your offer';
        showLink = true;
      }else{
        msgText = 'You have Rejected this offer';
        showLink = false;
      }
    }

    return (
      <TouchableOpacity onPress={handleOfferClick} style={[styles.offerWrapper, { backgroundColor: offerBgColor }]}>
        <FontAwesome5 name="list-alt" size={36} color={colors.textDark} />  
        <View style={styles.offerTextWrapper}>
            <Text style={styles.offerTextTitleStyles}>{msgText}</Text>
            {showLink && (
              <Text style={styles.offerTextStyles}>Click here to view</Text>
            )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
      <View style={[styles.container, { alignItems: isCurrentUser ? 'flex-end' : 'flex-start' }]}>
        <View style={[styles.msgWrapper, { backgroundColor: bgColor }]}>

          {
              msgData.msgType === 'text' ? (
              <Text style={styles.msgTextStyles}>{msgData.msgText}</Text>
            ) : msgData.msgType === 'image' ? (
              <TouchableOpacity onPress={() => handleDownload(msgData.msgText)}>
                <Image style={styles.chatImageStyles} source={{ uri: msgData.msgText }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleDownload(msgData.msgText)}>
                <Text style={styles.docDownloadTextStyles}>Download File</Text>
              </TouchableOpacity>
            )
          }

          <View style={styles.sttWrapper}>
            <Text style={[styles.timeTextStyles]}>{msgData.createdAt}</Text>
            {isCurrentUser && (
              <Ionicons name="checkmark-done-sharp" size={12} color={checkmarkColor} style={styles.checkTextStyles} />
            )}
          </View>
        </View>
      </View>
  );
};

export default ChatMessageItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
    justifyContent: 'center',
  },
  msgWrapper: {
    maxWidth: '80%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  msgTextStyles: {
    color: colors.textDark,
  },
  chatImageStyles: {
    width: 240,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  docDownloadTextStyles: {
    textDecorationLine: 'underline',
    color: colors.primary,
  },
  sttWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timeTextStyles: {
    fontSize: 10,
    color: colors.textGray,
  },
  checkTextStyles: {
    marginLeft: 5,
  },
  offerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  offerTextWrapper: {
    marginLeft: 10,
    paddingHorizontal: 20,
  },
  offerTextTitleStyles: {
    fontSize: 16,
    color: colors.textDark,
  },
  offerTextStyles: {
    color: colors.textDark,
    textDecorationLine: 'underline',
  },
});
