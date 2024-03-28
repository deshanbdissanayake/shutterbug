import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/general/Button'
import { getEarnings, getWithdrawlMethodsByUserId, withdrawEarnings } from '../../assets/data/earnings'
import Select from '../../components/general/Select'
import LoadingScreen from '../LoadingScreen'
import Input from '../../components/general/Input'

const WithdrawScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        resetFunc()
        navigation.goBack();
    }

    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [earnings, setEarnings] = useState(null);
    const [withMethods, setWithMethods] = useState(null);
    const [withdrawData, setWithdrawData] = useState({
        wdm_id: null,
        wd_amount: 0,
        wd_note: null,
    })
    
    useEffect(()=>{
        const getWithMethods = async () => {
            try {
                let res = await getWithdrawlMethodsByUserId();
                let res2 = await getEarnings();
                setWithMethods(res);
                setEarnings(res2);
            } catch (error) {
                console.error('error at getting withdrawal methods: ', error)
            } finally {
                setLoading(false)
            }
        }
        
        getWithMethods();
    },[])

    const resetFunc = () => {
        setBtnLoading(false);
        setWithdrawData({
            wdm_id: null,
            wd_amount: 0,
            wd_note: null,
        })
    }

    const handleWithdrawClick = () => {
        Alert.alert('Confirm', `Are sure you want to withdraw $${withdrawData.wd_amount}`, [
            {text: 'Cancel', onPress: () => null, style: 'cancel'},
            {text: 'Confirm', onPress: () => withdrawFunc()}
        ])
    }

    const withdrawFunc = async () => {
        setBtnLoading(true);
        try {
            const { wdm_id, wd_amount, wd_note } = withdrawData;

            if(!wdm_id || !wd_amount || !wd_note){
                Alert.alert('Error', 'All fields are required!');
                return;
            }

            if(wd_amount > earnings.withdrawable_amount || isNaN(wd_amount)){
                Alert.alert('Error', 'Enter a valid Withdraw Value!')
            }

            let formData = new FormData();

            let res = await withdrawEarnings(formData);
            if(res.stt == 'ok'){
                Alert.alert('Successful', res.msg, [
                    {text: 'OK', onPress: () => handleGoBack}
                ]);
            }else{
                Alert.alert('Failed', res.msg);
            }
        } catch (error) {
            console.error('error at withdraw function: ', error)
        } finally {
            setBtnLoading(false);
        }
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header
                text={'Withdraw'}
                handleGoBack={handleGoBack}
            />

            <ScrollView contentContainerStyle={styles.contentWrapper} showsVerticalScrollIndicator={false}>
                <View style={styles.withdrawForm}>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Withdrawable Amount</Text>
                        <Input 
                            value={earnings.withdrawable_amount}
                            editable={false}
                            disabled={true}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Withdraw Method</Text>
                        <Select
                            onSelect={(text) => setWithdrawData(prevData => ({...prevData, wdm_id: text}))}
                            options={withMethods.map(wm => ({ label: `${wm.wd_type} - ${wm.acc_bank}`, value: wm.wdm_id }))}
                            placeholder={'Select a Withdraw Method'}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Withdraw Amount</Text>
                        <Input 
                            keyboardType={'numeric'}
                            onChangeText={(text)=>setWithMethods(prevData => ({...prevData, wd_amount: text}))}
                            placeholder={'Enter Withdraw Amount'}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Withdraw Note</Text>
                        <Input 
                            keyboardType={'default'}
                            onChangeText={(text)=>setWithMethods(prevData => ({...prevData, wd_note: text}))}
                            placeholder={'Enter Withdraw Note (max 75 characters)'}
                            textArea={true}
                            multiline={true}
                            maxLength={75}
                        />
                    </View>
                </View>
            </ScrollView>
            <Button
                bgColor={colors.primary}
                content={<Text style={{color: colors.textLight}}>Withdraw</Text>}
                func={handleWithdrawClick}
                loading={btnLoading}
            />

        </View>
    )
}

export default WithdrawScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    contentWrapper: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    formGroup: {
        marginVertical: 10,
    },
    labelTextStyles: {
        marginBottom: 5,
        marginLeft: 2,
        color: colors.textDark,
    },

})