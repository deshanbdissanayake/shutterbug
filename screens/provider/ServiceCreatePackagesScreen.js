import { StyleSheet, Text, View, ScrollView, Alert, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import Header from '../../components/app/Header'
import LoadingScreen from '../LoadingScreen'
import { deleteServicePackage, getServiceById } from '../../assets/data/service'
import Button from '../../components/general/Button'
import Subtitle from '../../components/app/Subtitle'
import PackageItem from '../../components/app/PackageItem'
import NoData from '../../components/app/NoData'

const ServiceCreatePackagesScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { s_id } = route.params;
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState(null);
    const [packages, setPackages] = useState(null);

    useEffect(() => {
        const backAction = () => {
            if(!packages){
                Alert.alert(
                'Error',
                'Add at least one package!',
                [
                    { text: 'OK', onPress: () => null, style: 'cancel' }, 
                ],
                { cancelable: false }
                );
                return true;
            }else{
                navigation.goBack();
            }
        };
    
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
  
      return () => backHandler.remove();
    }, [packages]);

    const getData = async () => {
        try {
            let data = await getServiceById(s_id);
            setService(data);
            if(data){
                setPackages(data.packages)
            }
        } catch (error) {
            console.error('Error at getting updated package service:', error);
        } finally {
            setLoading(false)
        }
    };

    useFocusEffect(
        useCallback(()=>{
            getData();
        },[])
    )

    const deleteFunc = async (pkg_id) => {
        setLoading(true)
        try {
            let res = await deleteServicePackage(pkg_id);
            if(res.stt == 'ok'){
                Alert.alert('Successful', res.msg)
            }else{
                Alert.alert('Failed', res.msg)
            }
        } catch (error) {
            console.error('error at deleting package: ', error)
        } finally {
            setLoading(false)
        } 
        
    }

    const handleDoneClick = async () => {
        navigation.navigate('Service List');
    }

    const handleAddClick = async () => {
        navigation.navigate('Service Package Add', {s_id})
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header text={'Packages for ' + service.s_name}/>
            <ScrollView contentContainerStyle={styles.formWrapper} showsVerticalScrollIndicator={false}>
                <Subtitle text={'Packages Section'}/>
                {packages && packages.length > 0 ? (
                    <View style={styles.contentWrapper}>
                        <View style={styles.pkgWrapper}>
                            {packages.map((pkg, i) => (
                                <PackageItem key={i} pkgData={pkg} deleteFunc={deleteFunc} />
                            ))}
                        </View>
                        <View>
                            <Button
                                bgColor={colors.white}
                                content={<Text style={{color: colors.primary}}>Add New Package</Text>}
                                bdr={colors.primary}
                                func={handleAddClick}
                            />
                            <Button
                                bgColor={colors.primary}
                                content={<Text style={{color: colors.textLight}}>Done</Text>}
                                func={handleDoneClick}
                            />
                        </View>
                    </View>
                ) : (
                    <>
                        <NoData text={'No Packages Yet!'}/>
                        <Button
                            bgColor={colors.white}
                            content={<Text style={{color: colors.primary}}>Add New Package</Text>}
                            bdr={colors.primary}
                            func={handleAddClick}
                        />
                    </>
                )}
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
    formWrapper: {
        flexGrow: 1,
    },
    contentWrapper: {
        justifyContent: 'space-between', 
        flexGrow: 1
    },
})