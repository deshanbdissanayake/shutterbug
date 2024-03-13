import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/app/Header'

const ProfileEditScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Header text={'Edit My Profile'} handleGoBack={handleGoBack} />
            <Text>ProfileEditScreen</Text>
        </View>
    )
}

export default ProfileEditScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
})