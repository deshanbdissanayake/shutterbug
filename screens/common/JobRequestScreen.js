import { FlatList, ScrollView, StyleSheet, View, Text, Alert, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import { deleteRequest, getAllRequests } from '../../assets/data/requests'
import LoadingScreen from '../LoadingScreen'
import JobRequestItem from '../../components/app/JobRequestItem'
import MiniButton from '../../components/general/MiniButton'
import { Entypo } from '@expo/vector-icons'
import CustomModal from '../../components/general/CustomModal'

const JobRequestScreen = () => {
    const navigation = useNavigation();
    const isClient = true; //get from async storage

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleCreateClick = () => {
        navigation.navigate('Job Request Create')
    }

    const [requests, setRequests] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                let data = await getAllRequests();
                setRequests(data);
                setLoading(false);
            } catch (error) {
                console.error('error getting requests: ', error)
                setLoading(false);
            }
        }
        getData();
    },[])

    const handleDeleteRequest = async (req_id) => {
        setShowDeleteModal(true)
        setSelectedRequest(req_id)
    }

    const handleApplyRequest = async (req_id) => {
        navigation.navigate('Job Request Apply', req_id)
    }

    const handleViewRequest = async (req_id) => {
        navigation.navigate('Job Request Offers', req_id)
    }

    const deleteFunc = async () => {
        try {
            let data = await deleteRequest(selectedRequest);
            setShowDeleteModal(false)
            setSelectedRequest(null);
            if(data.stt == 'ok'){
                Alert.alert('Success', data.msg)
            }else{
                Alert.alert('Failed', data.msg)
            }
        } catch (error) {
            console.error('Error at deleting request: ', error);
            setShowDeleteModal(false)
            setSelectedRequest(null);
            Alert.alert('Error', 'Something went wrong.')
        } 
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <View style={styles.bodyWrapper}>
                <Header 
                    text={'Job Requests'} 
                    handleGoBack={handleGoBack} 
                    component={
                        isClient ? 
                        (<MiniButton
                            bgColor={colors.primary}
                            func={handleCreateClick}
                            content={<Entypo name="plus" size={24} color={colors.textLight} />}
                        />)
                        : null
                    }   
                />
                <FlatList
                    data={requests}
                    keyExtractor={(item) => item.req_id}
                    renderItem={({ item }) => (
                        <JobRequestItem 
                            data={item} 
                            isClient={isClient} 
                            handleDelete={handleDeleteRequest} 
                            handleApply={handleApplyRequest}
                            handleView={handleViewRequest}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {showDeleteModal && (
                <View style={styles.modalsWrapper}>
                    <StatusBar backgroundColor={colors.textGraySecondary} barStyle="light-content" />
                    <CustomModal 
                        title={'Delete Job Request'}
                        content={'Are you sure?'}
                        pressOk={deleteFunc}
                        okButtonText={'Confirm'}
                        pressCancel={() => setShowDeleteModal(false)}
                        cancelButtonText={'Cancel'}
                    />
                </View>
            )}
        </View>
    )
}

export default JobRequestScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    bodyWrapper: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 15,
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

