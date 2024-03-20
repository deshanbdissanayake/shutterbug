import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/general/Button'
import EarningsCard from '../../components/app/EarningsCard'

const EarningsScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleWithdrawClick = () => {
        navigation.navigate('Withdraw')
    }

    return (
        <View style={styles.container}>
            <Header
                text={'Earnings'}
                handleGoBack={handleGoBack}
            />

            <EarningsCard />

            <Button
                bgColor={colors.white}
                content={<Text style={{color: colors.primary}}>Go to Withdrawals</Text>}
                func={handleWithdrawClick}
                bdr={colors.primary}
            />

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