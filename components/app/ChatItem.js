import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import colors from '../../assets/colors/colors'

const ChatItem = ({ chatData, handleChatClick }) => {
    return (
        <TouchableOpacity onPress={() => handleChatClick(chatData.chat_id)}>
            <View style={styles.container}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.imageStyles} source={{ uri: chatData.chat_user_img }} />
                    <View style={styles.seenStatusStyles}>
                        <FontAwesome name="circle" size={20} color={chatData.chat_seen_status == 'yes' ? colors.borderGrayLight : colors.lightGreen } />
                    </View>
                </View>
                <View style={styles.chatWrapper}>
                    <View style={styles.nameWrapper}>
                        <Text style={styles.nameTextStyles}>{ chatData.chat_user_name }</Text>
                        <Text style={styles.timeTextStyles}>{ chatData.chat_last_msg_time }</Text>
                    </View>
                    <View style={styles.msgTextWrapper}>
                        <Text style={styles.msgTextStyles} numberOfLines={2}>{ chatData.chat_last_msg }</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: colors.borderGrayExtraLight,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    imageStyles: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    chatWrapper: {
        flex: 4,
    },
    nameWrapper: {
        flexDirection: 'row',
    },
    nameTextStyles: {
        flex: 2,
        fontWeight: '400',
        color: colors.textDark,
    },
    timeTextStyles: {
        flex: 1,
        textAlign: 'right',
        color: colors.textGraySecondary,
        fontSize: 12,
    },
    msgTextWrapper: {
        marginTop: 2,
    },
    msgTextStyles: {
        fontSize: 12,
        color: colors.textGraySecondary,
    },
    seenStatusStyles: {
        position: 'absolute',
        top: 0,
        right: 15,
    },
})