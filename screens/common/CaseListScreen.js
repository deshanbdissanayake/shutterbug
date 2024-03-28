import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import { useAppContext } from '../../layouts/AppContext'
import { getCasesByUserId } from '../../assets/data/case'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import NoData from '../../components/app/NoData'
import CaseItem from '../../components/app/CaseItem'

const CaseListScreen = () => {
    const navigation = useNavigation();
    const { isClient } = useAppContext();

    const [casesData, setCasesData] = useState();

    const getData = async (isClient) => {
        try {
            let res = await getCasesByUserId();
            setCasesData(res);
        } catch (error) {
            console.error('error at getting cases: ', error)
        }
    }

    useEffect(()=>{
        getData();
    },[])

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header text={'Cases'} handleGoBack={handleGoBack} />

            {(casesData && casesData.length > 0) ? (
                <FlatList
                    data={casesData}
                    keyExtractor={(item) => item.case_id.toString()}
                    renderItem={({item}) => <CaseItem caseData={item} />}
                />
            ) : (
                <NoData text={'No Cases'} />
            )}
        </View>
    )
}

export default CaseListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: colors.white,
    },
})