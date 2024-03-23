import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import Header from '../../components/app/Header'
import LoadingScreen from '../LoadingScreen'
import { getServiceById } from '../../assets/data/service'
import Button from '../../components/general/Button'

const ServiceCreatePackagesScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { s_id } = route.params;
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState(null);

    useEffect(()=>{
        const getServiceData = async () => {
            try {
                let data = await getServiceById(s_id);
                setService(data);
            } catch (error) {
                console.error('Error at getting updated package service:', error);
            } finally {
                setLoading(false)
            }
        };
        getServiceData();
    },[])

    const handleSubmitClick = async () => {

    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header text={'Create Service Packages for ' + service.s_name}/>
            <Text>Service Create Packages Screen</Text>

            <Button
                bgColor={colors.primary}
                content={<Text style={{color: colors.textLight}}>Create Packages</Text>}
                func={handleSubmitClick}
            />
        </View>
    )
}

export default ServiceCreatePackagesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 15,
    },
})