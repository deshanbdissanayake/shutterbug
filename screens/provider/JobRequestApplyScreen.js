import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from '../LoadingScreen'
import { createOffer, getRequestById } from '../../assets/data/requests'
import Button from '../../components/general/Button'
import JobRequestItem from '../../components/app/JobRequestItem'
import Select from '../../components/general/Select'
import { getCategories } from '../../assets/data/category'
import { getServicesByUserId } from '../../assets/data/service'
import PackageSingle from '../../components/app/PackageSingle'
import Input from '../../components/general/Input'
import FormErrorMsg from '../../components/general/FormErrorMsg'

const JobRequestApplyScreen = ({req_id}) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [reqData, setReqData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [services, setServices] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [offerNotes, setOfferNotes] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getData = async () => {
        try {
            let req = await getRequestById(req_id)
            let serv = await getServicesByUserId()
            setServices(serv)
            setReqData(req)
            setLoading(false)
        } catch (error) {
            console.error('error at getting request apply screen: ', error)
            setLoading(false)
        }
    } 

    useEffect(() => {
        getData();
    },[])

    const createOfferFunc = async () => {
        if(!selectedService || !selectedPackage || !offerNotes){
            setErrorMsg('All fields are Required!')
            return;
        }else{
            setErrorMsg(null)
        }

        try {
            let data = await createOffer()

            if(data.stt == 'ok'){
                Alert.alert('Successful', data.msg)
                navigation.navigate('Job Request')
            }else{
                Alert.alert('Failed', data.msg)
            }
        } catch (error) {
            console.error('error at creating job request offer: ', error)
        }
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
        >
            <Header text={'Job Request Apply'} handleGoBack={handleGoBack} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <JobRequestItem 
                    data={reqData} 
                    noButtons={true}
                />
                <View style={styles.formWrapper}>
                    
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Select Service</Text>
                        <Select
                            value={selectedService}
                            onSelect={setSelectedService}
                            placeholder={'Select Service'}
                            options={services.map((val) => ({ label: val.s_name, value: val.s_id }))}
                        />
                    </View>
                    
                    {selectedService && (
                        <>
                            <View style={styles.formGroup}>
                                <Text style={styles.labelTextStyles}>Select Package</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {(() => {
                                        let x = services.filter((val) => selectedService === val.s_id);
                                        return x[0]?.packages.map((pkg) => (
                                            <PackageSingle
                                                key={pkg.pkg_id.toString()}
                                                pkg={pkg}
                                                selectedPkg={selectedPackage}
                                                handlePackageSelect={setSelectedPackage}
                                            />
                                        ));
                                    })()}
                                </ScrollView>
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.labelTextStyles}>Offer Note</Text>
                                <Input
                                    keyboardType={'default'}
                                    value={offerNotes}
                                    onChangeText={setOfferNotes}
                                    placeholder={'Enter your offer notes here'}
                                    multiline={true}
                                    textArea={true}
                                />
                            </View>
                        </>
                    )}
                </View>
                <FormErrorMsg msg={errorMsg} />
                <Button
                    bgColor={colors.primary}
                    content={<Text style={{color: colors.textLight}}>Apply</Text>}
                    func={createOfferFunc}
                />
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
    formGroup: {
        marginVertical: 10,
    },
    labelTextStyles: {
        marginBottom: 5,
        marginLeft: 2,
        color: colors.textDark,
    },
})