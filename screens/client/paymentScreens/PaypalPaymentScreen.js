import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../../assets/colors/colors'
import Header from '../../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import Button from '../../../components/general/Button'

const PaypalPaymentScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleConfirmClick = () => {
        navigation.navigate('Invoice View', job_id);
    }
    return (
        <View style={styles.container}>
            <View>
                <Header text={'Paypal Payment Screen'} handleGoBack={handleGoBack} />
                <Text>Under development</Text>
            </View>
            <Button
                bgColor={colors.primary}
                content={<Text style={{color: colors.textLight}}>Confirm Payment</Text>}
                func={handleConfirmClick}
            />
        </View>
    )
}

export default PaypalPaymentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
})