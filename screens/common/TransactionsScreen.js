import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'

const TransactionsScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header text={'Transaction History'} handleGoBack={handleGoBack}/>
            <View style={styles.contentWrapper}>
                <Text>TransactionsScreen</Text>
            </View>
        </View>
    )
}

export default TransactionsScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 15,
        backgroundColor: colors.white,
   },
   contentWrapper: {
        flexGrow: 1,
        justifyContent: 'space-between',
   },
})