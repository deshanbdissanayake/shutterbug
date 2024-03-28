import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import colors from '../../assets/colors/colors'
import LoadingScreen from '../../screens/LoadingScreen'
import { useFocusEffect } from '@react-navigation/native'
import { getEarnings } from '../../assets/data/earnings'

const EarningsCard = () => {
    const [earnData, setEarnData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            let data = await getEarnings();
            console.log(data)
            setEarnData(data);
        } catch (error) {
            console.error('error at earning card: ', error)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getData();
        },[])
    )

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Withdrawable Amount</Text>
                <Text style={styles.tableDataStyles}>${earnData.withdrawable_amount}</Text>
            </View>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Pending Clearance</Text>
                <Text style={styles.tableDataStyles}>${earnData.pending_clearance}</Text>
            </View>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Total Personal Balance</Text>
                <Text style={styles.tableDataStyles}>${earnData.total_amount}</Text>
            </View>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Earning in this month</Text>
                <Text style={styles.tableDataStyles}>${earnData.this_month_earnings}</Text>
            </View>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Avg. Job Price</Text>
                <Text style={styles.tableDataStyles}>${earnData.avg_job_price}</Text>
            </View>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Active Jobs</Text>
                <Text style={styles.tableDataStyles}>{earnData.active_jobs}</Text>
            </View>
        </View>
    )
}

export default EarningsCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrayExtraLight,
        marginBottom: 10,
    },
    tableRowStyles: {
        paddingVertical: 20,
        paddingHorizontal: 5,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: colors.borderGrayExtraLight,
    },
    tableHeaderStyles: {
        flex: 1,
        fontWeight: '400',
        color: colors.textDark,
    },
    tableDataStyles: {
        flex: 1,
        fontWeight: '300',
        color: colors.textDark,
    },
})