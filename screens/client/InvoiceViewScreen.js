import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { getJobInvoiceByJobId } from '../../assets/data/jobs'
import { FontAwesome5 } from '@expo/vector-icons'
import Button from '../../components/general/Button'
import LoadingScreen from '../LoadingScreen'
import { useNavigation } from '@react-navigation/native'

const InvoiceViewScreen = ({job_id}) => {
    const navigation = useNavigation();

    const [invData, setInvData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            let data = await getJobInvoiceByJobId(job_id);
            setInvData(data);
            setLoading(false);
        }
        getData();
    }, [])

    const handleChatClick = (chat_id) => {
        navigation.navigate('Single Chat', chat_id)
    }

    const handleOrderClick = (job_id) => {
        navigation.navigate('Single Job', job_id)
    }

    if(loading){
        return <LoadingScreen />
    }

    return (
        <View style={styles.container}>
            <Header text={'Invoice #'+ invData.inv_token} />
            <FontAwesome5 name="file-invoice-dollar" size={75} color={colors.primary} style={styles.iconStyles} />
            <View style={styles.invDataWrapper}>
                <View style={styles.textWrapper}>
                    <Text style={[styles.textStyles, styles.titleTextStyles]}>Job Id</Text>
                    <Text style={[styles.textStyles, styles.dataTextStyles]}>#{invData.job_token}</Text>
                </View>
                <View style={styles.textWrapper}>
                    <Text style={[styles.textStyles, styles.titleTextStyles]}>From</Text>
                    <Text style={[styles.textStyles, styles.dataTextStyles]}>{invData.client_name}</Text>
                </View>
                <View style={styles.textWrapper}>
                    <Text style={[styles.textStyles, styles.titleTextStyles]}>To</Text>
                    <Text style={[styles.textStyles, styles.dataTextStyles]}>{invData.provider_name}</Text>
                </View>
                <View style={styles.textWrapper}>
                    <Text style={[styles.textStyles, styles.titleTextStyles]}>Amount</Text>
                    <Text style={[styles.textStyles, styles.dataTextStyles]}>${invData.inv_amt}</Text>
                </View>
                <View style={styles.textWrapper}>
                    <Text style={[styles.textStyles, styles.titleTextStyles]}>Service Charge</Text>
                    <Text style={[styles.textStyles, styles.dataTextStyles]}>${invData.service_charge}</Text>
                </View>
                <View style={styles.textWrapper}>
                    <Text style={[styles.textStyles, styles.titleTextStyles]}>Date/Time</Text>
                    <Text style={[styles.textStyles, styles.dataTextStyles]}>{invData.inv_date}</Text>
                </View>
            </View>
            <View style={styles.btnWrapper}>
                <Button
                    content={<Text style={{color: colors.primary}}> Go to Chat</Text>}
                    func={() => handleChatClick(invData.chat_id)}
                    bdr={colors.primary}
                />
                <Button
                    content={<Text style={{color: colors.primary}}> Go to Job</Text>}
                    func={() => handleOrderClick(invData.job_id)}
                    bdr={colors.primary}
                />
            </View>
        </View>
    )
}

export default InvoiceViewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: 10, 
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    iconStyles: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    invDataWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrayLight,
    },
    textWrapper: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: colors.borderGrayLight,
        paddingVertical: 15,
        paddingHorizontal: 5,
    },
    textStyles: {
        flex: 1,
        color: colors.textDark,
    },
    titleTextStyles: {
        fontWeight: '400',
        fontSize: 16,
    },
    dataTextStyles: {
        fontWeight: '300',
        fontSize: 16,
    },
    btnWrapper: {

    },
})