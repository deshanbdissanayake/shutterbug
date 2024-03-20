import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/general/Button'
import EarningsCard from '../../components/app/EarningsCard'

const WithdrawScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleWithdrawFunc = () => {
        
    }

    return (
        <View style={styles.container}>
            <Header
                text={'Withdraw'}
                handleGoBack={handleGoBack}
            />

            <Button
                bgColor={colors.primary}
                content={<Text style={{color: colors.textLight}}>Withdraw</Text>}
                func={handleWithdrawFunc}
            />

        </View>
    )
}

export default WithdrawScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
})