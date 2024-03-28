import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getTransactionsByUserId } from '../../assets/data/earnings'
import LoadingScreen from '../LoadingScreen'
import NoData from '../../components/app/NoData'
import MiniButton from '../../components/general/MiniButton'
import { AntDesign } from '@expo/vector-icons'
import CustomModal from '../../components/general/CustomModal'

const TransactionItem = ({trData, handleShowModal}) => {
    return (
        <View style={styles.transItemWrapper}>
            <View style={styles.leftWrapper}>
                <Text style={styles.transItemBankTextStyles}>{trData.bank}</Text>
                <Text style={styles.transItemNameTextStyles}>{trData.tr_name}</Text>
                <Text style={styles.transItemDateTextStyles}>{trData.tr_datetime}</Text>
            </View>
            <View style={styles.rightWrapper}>
                <Text style={styles.transItemAmountTextStyles}>{trData.tr_amount}</Text>
                <MiniButton
                    func={() => handleShowModal(trData.tr_id)}
                    content={<AntDesign name="right" size={24} color={colors.textDark} />}
                />
            </View>
        </View>
    )
}

const ModalItem = ({trData}) => {
    return (
        <View style={styles.modalItemWrapper}>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Transaction ID</Text>
                <Text style={styles.tableDataStyles}>{trData.tr_token}</Text>
            </View>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Transaction Type</Text>
                <Text style={styles.tableDataStyles}>{trData.tr_type}</Text>
            </View>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Transaction Amount</Text>
                <Text style={styles.tableDataStyles}>{trData.tr_amount}</Text>
            </View>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Transaction Date Time</Text>
                <Text style={styles.tableDataStyles}>{trData.tr_datetime}</Text>
            </View>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Transaction Bank</Text>
                <Text style={styles.tableDataStyles}>{trData.bank}</Text>
            </View>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Transaction Name</Text>
                <Text style={styles.tableDataStyles}>{trData.tr_name}</Text>
            </View>
            <View style={styles.tableRowStyles}>
                <Text style={styles.tableHeaderStyles}>Transaction Remarks</Text>
                <Text style={styles.tableDataStyles}>{trData.tr_note}</Text>
            </View>
        </View>
    )
}

const TransactionsScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [loading, setLoading] = useState(true)
    const [transData, setTransData] = useState(null)
    const [selecetedTransData, setSelectedTransData] = useState(null)
    const [showModal, setShowModal] = useState(false);

    const getData = async () => {
        try {
            let res = await getTransactionsByUserId();
            setTransData(res);
        } catch (error) {
            console.error('error at getting transactions: ', error)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getData();
        },[])
    )

    const handleShowModal = (tr_id) => {
        console.log('hi')
        let trans = transData.filter(e => e.tr_id === tr_id);
        console.log(trans)
        if (trans.length > 0) {
            setSelectedTransData(trans[0]);
            setShowModal(true);
        } else {
            console.error('No transaction data found for tr_id:', tr_id);
        }
    }
    

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <>
            <View style={styles.container}>
                <Header text={'Transaction History'} handleGoBack={handleGoBack}/>
                {transData && transData.length > 0 ? (
                    <FlatList
                        data={transData}
                        keyExtractor={(item) => item.tr_id.toString()}
                        renderItem={({item}) => <TransactionItem trData={item} handleShowModal={handleShowModal} />}
                    />
                ) : (
                    <NoData text={'No transactions yet!'}/>
                )}
            </View>
            {showModal && (
                <View style={styles.modalsWrapper}>
                    <StatusBar backgroundColor={colors.textGraySecondary} barStyle="light-content" />
                    <CustomModal
                        title={'Transactions Details'}
                        content={<ModalItem trData={selecetedTransData} />}
                        okButtonText={'Close'}
                        pressOk={() => setShowModal(false)}
                    />
                </View>
            )}
        </>
    )
}

export default TransactionsScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 15,
        backgroundColor: colors.white,
    },
    modalsWrapper:{
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: colors.transparentDark,
        width: "100%",
        height: "100%",
    },
})