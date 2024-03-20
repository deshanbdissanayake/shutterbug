import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'

const EarningsScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleWithdraw = () => {
        navigation.navigate('Withdraw')
    }

    return (
        <View style={styles.container}>
            <Header
                text={'Earnings'}
                handleGoBack={handleGoBack}
            />

            <Text>Personal Balance</Text>
            <Text>Earning in this month</Text>
            <Text>Avg. Job Price</Text>
            <Text>Pending Clearance</Text>
            <Text>Active Jobs</Text>


        </View>
    )
}

export default EarningsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
})