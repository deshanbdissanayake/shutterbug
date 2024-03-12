import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { getMyData } from '../../assets/data/profile'
import LoadingScreen from '../../screens/LoadingScreen'
import colors from '../../assets/colors/colors'

const MyProfile = () => {

    const [myData, setMyData] = useState(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(()=>{
            const getData = async () => {
                try {
                    const data = await getMyData();
                    setMyData(data)
                    setLoading(false)
                } catch (error) {
                    
                }
            }
            getData();
        },[])
    )

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: myData.pro_pic }} style={styles.imageStyles} />
            <View>
                <View style={styles.nameWrapper}>
                    <Text style={styles.fullnameTextStyles}>{myData.fullname}</Text>
                    <Text style={styles.usernameTextStyles}>(@{myData.username})</Text>
                </View>
                <Text style={styles.emailTextStyles}>{myData.email}</Text>
                <Text style={styles.balanceTextStyles}>Personal Balance: ${myData.balance}</Text>
            </View>
        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.bgLight,
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    imageStyles: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 50,
        marginRight: 15,
    },
    nameWrapper: {
        flexDirection: 'row',
    },
    fullnameTextStyles: {
        color: colors.textDark,
        fontSize: 16,
        fontWeight: '400',
    },
    usernameTextStyles: {
        color: colors.textGraySecondary,
        marginLeft: 5,
    },
    emailTextStyles: {
        color: colors.textDark,
        fontWeight: '300',
        fontSize: 12,
    },
    balanceTextStyles: {
        marginTop: 7,
        color: colors.textDark,
        fontWeight: '300',
    },
})