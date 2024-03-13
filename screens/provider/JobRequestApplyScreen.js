import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from '../LoadingScreen'
import { getRequestById } from '../../assets/data/requests'

const JobRequestApplyScreen = ({req_id}) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [reqData, setReqData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            let data = await getRequestById();
            setReqData(data)
            setLoading(false)
        } catch (error) {
            console.error('error at getting single request: ', error)
            setLoading(false)
        }
    } 

    useEffect(() => {
        //check whether applied or not and disable fields accordingly.
        getData();
    },[])

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
        >
            <Header text={'Job Request Apply'} handleGoBack={handleGoBack} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text>Job Request Apply Screen</Text>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default JobRequestApplyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
})