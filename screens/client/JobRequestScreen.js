import { FlatList, ScrollView, StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import { getAllRequests } from '../../assets/data/requests'
import LoadingScreen from '../LoadingScreen'
import JobRequestItem from '../../components/app/JobRequestItem'
import MiniButton from '../../components/general/MiniButton'
import { Entypo } from '@expo/vector-icons'

const JobRequestScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleCreateClick = () => {
        navigation.navigate('Job Request Create')
    }

    const [requests, setRequests] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header 
                text={'Job Requests'} 
                handleGoBack={handleGoBack} 
                component={
                    <MiniButton
                        bgColor={colors.bgLight}
                        func={handleCreateClick}
                        content={<Entypo name="plus" size={24} color={colors.textDark} />}
                    />
                }   
            />
            <FlatList
                data={requests}
                keyExtractor={(item) => item.req_id}
                renderItem={({ item }) => <JobRequestItem data={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default JobRequestScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
})

