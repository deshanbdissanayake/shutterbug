import { StyleSheet, Text, View, ScrollView, Alert, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import Header from '../../components/app/Header'
import LoadingScreen from '../LoadingScreen'
import { getServiceById } from '../../assets/data/service'
import Button from '../../components/general/Button'
import Subtitle from '../../components/app/Subtitle'

const ServiceCreatePackagesScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        const backAction = () => {
            Alert.alert(
            'Confirm',
            'Are you sure you want to go back?',
            [
                { text: 'Cancel', onPress: () => null, style: 'cancel' },
                { text: 'OK', onPress: () => navigation.navigate('YourScreen') },
            ],
            { cancelable: false }
            );
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
  
      return () => backHandler.remove();
    }, []);

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
            <ScrollView contentContainerStyle={styles.formWrapper} showsVerticalScrollIndicator={false}>
                <Subtitle text={'Packages Section'}/>
                <Button
                    bgColor={colors.primary}
                    content={<Text style={{color: colors.textLight}}>Create Packages</Text>}
                    func={handleSubmitClick}
                />
            </ScrollView>
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
    formGroup: {
        marginVertical: 10,
    },
    labelTextStyles: {
        marginBottom: 5,
        marginLeft: 2,
        color: colors.textDark,
    },
})