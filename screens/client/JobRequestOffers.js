import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import { getRequestById, getOffersByReqId } from '../../assets/data/requests'
import LoadingScreen from '../LoadingScreen'
import JobRequestOfferItem from '../../components/app/JobRequestOfferItem'
import JobRequestItem from '../../components/app/JobRequestItem'
import Subtitle from '../../components/app/Subtitle'

const JobRequestOffers = ({req_id}) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [offerData, setOfferData] = useState(null);
    const [reqData, setReqData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            let data = await getOffersByReqId(req_id);
            let req = await getRequestById(req_id);
            setOfferData(data);
            setReqData(req);
            setLoading(false);
        } catch (error) {
            console.error('error at request offer: ', error)
            setLoading(false)
        }
    } 

    useEffect(()=>{
        getData();
    },[])

    const handleConfirm = (offer_id) => {
        //show alert if yes => navigate to chat
    }

    const handleReject = (offer_id) => {
        //show alert
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Header text={'Offers for Request'} handleGoBack={handleGoBack} />

            <Subtitle text={'Request Details'}/>
            <JobRequestItem data={reqData} noButtons={true} />

            <Subtitle text={'Offers'}/>
            { offerData && offerData.map((item)=>(
                <JobRequestOfferItem 
                    key={item.offer_id.toString()}
                    offerData={item} 
                    handleConfirm={handleConfirm} 
                    handleReject={handleReject}
                    offerStatus={reqData.offer_status}
                />
            ))}
        </ScrollView>
    )
}

export default JobRequestOffers

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
})