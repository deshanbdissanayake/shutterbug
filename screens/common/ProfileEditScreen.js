import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import colors from '../../assets/colors/colors'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Header from '../../components/app/Header'
import { getMyData } from '../../assets/data/profile'
import LoadingScreen from '../LoadingScreen'
import MiniButton from '../../components/general/MiniButton'
import Input from '../../components/general/Input'
import { AntDesign } from '@expo/vector-icons'
import Button from '../../components/general/Button'

const ProfileEditScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const [myData, setMyData] = useState(null);
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        try {
            let data = await getMyData();
            setMyData(data)
        } catch (error) {
            console.error('error at profile edit data: ', error)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getData();
        },[])
    )

    const handleImageChange = () => {}
    const saveProfEdit = () => {}

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Header text={'Edit My Profile'} handleGoBack={handleGoBack} />
            <ScrollView contentContainerStyle={styles.contentWrapper} showsVerticalScrollIndicator={false}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.imageStyles} source={{ uri: myData.pro_pic }} />
                    <View style={styles.imageChangeBtnStyles}>
                        <MiniButton
                            func={handleImageChange}
                            content={<AntDesign name="camerao" size={24} color={colors.primary} />}
                            bgColor={colors.bgLight}
                        />
                    </View>
                </View>
    
                <View style={styles.profileFormWrapper}>
                    
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Username</Text>
                        <Input
                            keyboardType={'default'}
                            value={myData.username}
                            onChangeText={(text) => setMyData({...myData, username: text})}
                            placeholder={'Username here'}
                            editable={false}
                            disabled={true}
                        />
                    </View>
    
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Email</Text>
                        <Input
                            keyboardType={'email-address'}
                            value={myData.email}
                            onChangeText={(text) => setMyData({...myData, email: text})}
                            placeholder={'Email here'}
                            editable={false}
                            disabled={true}
                        />
                    </View>
    
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>First Name</Text>
                        <Input
                            keyboardType={'default'}
                            value={myData.first_name}
                            onChangeText={(text) => setMyData({...myData, first_name: text})}
                            placeholder={'First Name here'}
                        />
                    </View>
    
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Last Name</Text>
                        <Input
                            keyboardType={'default'}
                            value={myData.last_name}
                            onChangeText={(text) => setMyData({...myData, last_name: text})}
                            placeholder={'Last Name here'}
                        />
                    </View>
    
                    <Button
                        bgColor={colors.primary}
                        content={<Text style={{color: colors.textLight}}>Save</Text>}
                        func={saveProfEdit}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
   
}

export default ProfileEditScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    contentWrapper: {
        flexGrow: 1,
    },
    formGroup: {
        marginVertical: 10,
    },
    labelTextStyles: {
        marginBottom: 5,
        marginLeft: 2,
        color: colors.textDark,
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyles: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 100,
    },
    imageChangeBtnStyles: {
        position: 'absolute',
        right: 100,
        bottom: 0,
        
    },
})