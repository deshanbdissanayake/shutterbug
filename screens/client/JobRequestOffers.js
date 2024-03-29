import { Alert, FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import { getRequestById, getOffersByReqId, confirmOffer, rejectOffer } from '../../assets/data/requests'
import LoadingScreen from '../LoadingScreen'
import JobRequestOfferItem from '../../components/app/JobRequestOfferItem'
import JobRequestItem from '../../components/app/JobRequestItem'
import Subtitle from '../../components/app/Subtitle'
import CustomModal from '../../components/general/CustomModal'

const JobRequestOffers = ({req_id}) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [offerData, setOfferData] = useState(null);
    const [reqData, setReqData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);

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

    const sttUpdate = async (type) => {
        setShowConfirmModal(false);
        setShowRejectModal(false);

        try {
            let data;
            if (type === 'confirm') {
                data = await confirmOffer(selectedOffer);
            } else {
                data = await rejectOffer(selectedOffer);
            }

            if(data.stt == 'ok'){
                Alert.alert('Successful', data.msg)
            }else{
                Alert.alert('Failed', data.msg)
            }
        } catch (error) {
            console.error('Error at stt update request offers:', error);
        }        
    }

    const handleConfirm = (offer_id) => {
        setShowConfirmModal(true);
        setSelectedOffer(offer_id)
    }

    const handleReject = (offer_id) => {
        setShowRejectModal(true);
        setSelectedOffer(offer_id)
    }


    if(loading){
        return <LoadingScreen/>
    }

    return (
        <>
            <View style={styles.container}>
                <Header text={'Offers for Request'} handleGoBack={handleGoBack} />
                <ScrollView contentContainerStyle={styles.contentWrapper} showsVerticalScrollIndicator={false}>
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
            </View>
            {showConfirmModal && (
                <View style={styles.modalsWrapper}>
                    <StatusBar backgroundColor={colors.textGraySecondary} barStyle="light-content" />
                    <CustomModal 
                        title={'Confirm Job Request'}
                        content={'Are you sure?'}
                        pressOk={() => sttUpdate('confirm')}
                        okButtonText={'Confirm'}
                        pressCancel={() => setShowConfirmModal(false)}
                        cancelButtonText={'Cancel'}
                    />
                </View>
            )}
            {showRejectModal && (
                <View style={styles.modalsWrapper}>
                    <StatusBar backgroundColor={colors.textGraySecondary} barStyle="light-content" />
                    <CustomModal 
                        title={'Reject Job Request'}
                        content={'Are you sure?'}
                        pressOk={() => sttUpdate('reject')}
                        okButtonText={'Reject'}
                        pressCancel={() => setShowRejectModal(false)}
                        cancelButtonText={'Cancel'}
                    />
                </View>
            )}
        </>
    )
}

export default JobRequestOffers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    contentWrapper: {
        flexGrow: 1,
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