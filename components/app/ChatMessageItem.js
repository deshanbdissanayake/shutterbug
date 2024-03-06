import React from 'react';
import { Image, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../assets/colors/colors';

const ChatMessageItem = ({ msgData }) => {
  const user_id = 1; // Assume user ID retrieval from async storage

  const isCurrentUser = msgData.msgBy === user_id;
  const bgColor = isCurrentUser ? colors.infoLight : colors.warningLight;
  const checkmarkColor = isCurrentUser && msgData.readStt ? colors.primary : colors.textGray;

  const handleDownload = (fileUrl) => {
    // Open the file URL in the default browser or file viewer
    Linking.openURL(fileUrl);
  };

  return (
      <View style={[styles.container, { alignItems: isCurrentUser ? 'flex-end' : 'flex-start' }]}>
        <View style={[styles.msgWrapper, { backgroundColor: bgColor }]}>
          {msgData.msgType === 'text' ? (
            <Text style={styles.msgTextStyles}>{msgData.msgText}</Text>
          ) : msgData.msgType === 'image' ? (
            <TouchableOpacity onPress={() => handleDownload(msgData.msgText)}>
              <Image style={styles.chatImageStyles} source={{ uri: msgData.msgText }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleDownload(msgData.msgText)}>
              <Text style={styles.docDownloadTextStyles}>Download File</Text>
            </TouchableOpacity>
          )}

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
});
