import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/general/Button'

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

            <View style={styles.tableStyles}>
                <View style={styles.tableRowStyles}>
                    <Text style={styles.tableHeaderStyles}>Personal Balance</Text>
                    <Text style={styles.tableDataStyles}></Text>
                </View>
                <View style={styles.tableRowStyles}>
                    <Text style={styles.tableHeaderStyles}>Earning in this month</Text>
                    <Text style={styles.tableDataStyles}></Text>
                </View>
                <View style={styles.tableRowStyles}>
                    <Text style={styles.tableHeaderStyles}>Avg. Job Price</Text>
                    <Text style={styles.tableDataStyles}></Text>
                </View>
                <View style={styles.tableRowStyles}>
                    <Text style={styles.tableHeaderStyles}>Pending Clearance</Text>
                    <Text style={styles.tableDataStyles}></Text>
                </View>
                <View style={styles.tableRowStyles}>
                    <Text style={styles.tableHeaderStyles}>Active Jobs</Text>
                    <Text style={styles.tableDataStyles}></Text>
                </View>
            </View>

            <Button
                bgColor={colors.primary}
                content={<Text style={{color: colors.textLight}}>Withdraw</Text>}
                func={handleWithdraw}
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
    tableStyles: {

    },
    tableRowStyles: {
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrayExtraLight,
        paddingVertical: 5,
        flexDirection: 'row',
    },
    tableHeaderStyles: {
        flex: 1,
        fontWeight: '400',
    },
    tableDataStyles: {
        flex: 1,
        fontWeight: '300',
    },
})