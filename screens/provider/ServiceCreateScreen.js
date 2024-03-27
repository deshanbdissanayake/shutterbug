import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getServiceById, saveService } from '../../assets/data/service'
import Input from '../../components/general/Input'
import Select from '../../components/general/Select'
import { getCategories } from '../../assets/data/category'
import LoadingScreen from '../LoadingScreen'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import Button from '../../components/general/Button'
import Subtitle from '../../components/app/Subtitle'
import MiniButton from '../../components/general/MiniButton'
import * as DocumentPicker from 'expo-document-picker';

const ServiceCreateScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const handleGoBack = () => {
        navigation.goBack();
    }
    
    const { s_id } = route.params;
    const isFirstLoad = useRef(true); // useRef to track initial load


    const title = s_id ? 'Update' : 'Create New';
    const [imgNum, setImgNum] = useState(1); //for delete images
    const [loading, setLoading] = useState(true);
    const [serviceCatOrg, setServiceCatOrg] = useState(null);
    const [serviceCat, setServiceCat] = useState(null);
    const [serviceData, setServiceData] = useState({
        s_id: null,
        s_type: 'photography',
        cat_id: null,
        s_name: null,
        s_desc: null,
        s_images: [],
    });

    const serviceTypes = [
        {value: 'photography', label: 'Photography'},
        {value: 'videography', label: 'Videography'},
    ]

    const getServiceCategories = async () => {
        try {
            let data = await getCategories();
            setServiceCatOrg(data);
        } catch (error) {
            console.error('Error at service create provider service category:', error);
        }
    };

    const getServiceData = async () => {
        try {
            let data = await getServiceById(s_id);
            setServiceData({
                s_id: data.s_id,
                s_type: data.s_type,
                cat_id: data.cat_id,
                s_name: data.s_name,
                s_desc: data.s_desc,
                s_images: data.s_images,
            });
        } catch (error) {
            console.error('Error at getting updated service:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getServiceCategories()
                if (s_id) {
                    await getServiceData();
                }
            } catch (error) {
                console.error('Error occurred while fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [s_id]);

    useEffect(() => {
        if (!isFirstLoad.current) {
            setServiceData(prevData => ({ ...prevData, cat_id: null }));
        } else {
            isFirstLoad.current = false; // Set isFirstLoad to false after initial load
        }
    }, [serviceData.s_type]);
    
    useEffect(() => {
        getServiceCategoriesByTypes(serviceData.s_type);
    }, [serviceCatOrg, serviceData.s_type]);

    const getServiceCategoriesByTypes = (stype) => {
        let data, scats = null;
        if(serviceCatOrg){
            data = serviceCatOrg.filter((scat) => scat.type === stype);
        }

        if(data && data.length > 0){
            scats = data.map(val => ({ value: val.id, label: val.name }));
        }else{
            scats = [{ value: 0, label: 'No Categories Yet' }];
        }

        setServiceCat(scats);
    };
    
    const handleImageSelect = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*', // Allow any type of file to be picked
                copyToCacheDirectory: false, // Don't copy the file to app's cache directory
            });
        
            if (!result.canceled) {
                // Handle the selected file, for example, you can log its URI
                setServiceData(prevData => ({
                    ...prevData,
                    s_images: [...(prevData.s_images || []), { si_id: imgNum, img: result.assets[0].uri }]
                }));
                
                setImgNum(prevData => prevData+1);                 
            } else {
                // User canceled the file picking
                Alert.alert('Error', 'Please select a valid image file (jpg, jpeg, png)');
            }
        } catch (error) {
            console.error('Error selecting file:', error);
        }
    }

    const handleRemoveImage = (del_img_id) => {
        setServiceData(prevData => ({
            ...prevData,
            s_images: prevData.s_images.map((e) => 
                e.si_id === del_img_id ? { ...e, stt: 'deleted' } : e
            )
        }));
    };
    
    const handleSubmitClick = async () => {
        let formData = new FormData();
    
        try {

            if (!serviceData) {
                throw new Error('Something went wrong!');
            }
            
            const { cat_id, s_name, s_desc, s_images } = serviceData;
    
            if ( !cat_id || !s_name || !s_desc || !s_images ) {
                throw new Error('All fields are required!');
            }
    
            let data = await saveService(formData, s_id);
            
            if (data.stt == 'ok') {
                Alert.alert('Successful', data.msg, [{ 
                    text: 'Next', 
                    onPress: () => navigation.navigate('Service Package Create', { data: data.data }) 
                }]);
            } else {
                Alert.alert('Error', data.msg);
            }
        } catch (error) {
            console.error('Error at saving service:', error);
        }
    };
    
    if(loading){
        return <LoadingScreen/>
    }

    return (
        <View style={styles.container}>
            <Header
                text={title + ' Service'}
                handleGoBack={handleGoBack}
            />

            <ScrollView contentContainerStyle={styles.formWrapper} showsVerticalScrollIndicator={false}>
                <Subtitle text={'Service Section'}/>

                <View style={styles.formGroup}>
                    <Text style={styles.labelTextStyles}>Service Images</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                        <TouchableOpacity onPress={handleImageSelect} style={styles.addImageWrapper}>
                            <AntDesign name="plus" size={24} color={colors.primary} />
                        </TouchableOpacity>
                        {serviceData.s_images && serviceData.s_images.length > 0 && (
                            serviceData.s_images.map((imgData, index) => (
                                (imgData.stt !== 'deleted') && (
                                    <View key={index}>
                                        <Image style={styles.imageStyles} source={{ uri: imgData.img }} />
                                        <View style={styles.imageDelIconStyles} >
                                            <MiniButton
                                                func={() => handleRemoveImage(imgData.si_id)}
                                                content={<FontAwesome name="trash" size={24} color={colors.danger}/>}
                                                bgColor={colors.white}
                                            />
                                        </View>
                                    </View>
                                )
                            ))
                        )}
                    </ScrollView>
                </View>


                <View style={styles.formGroup}>
                    <Text style={styles.labelTextStyles}>Service Type</Text>
                    <Select
                        value={serviceData.s_type}
                        onSelect={(text) => setServiceData({...serviceData, s_type: text})}
                        placeholder={'Select Service Type'}
                        options={serviceTypes}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.labelTextStyles}>Service Category</Text>
                    <Select
                        value={serviceData.cat_id}
                        onSelect={(text) => setServiceData({...serviceData, cat_id: text})}
                        placeholder={'Select Service Category'}
                        options={serviceCat}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.labelTextStyles}>Service Name</Text>
                    <Input
                        keyboardType={'default'}
                        value={serviceData.s_name}
                        onChangeText={(text) => setServiceData({...serviceData, s_name: text})}
                        placeholder={'Enter service name'}
                        maxLength={50}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.labelTextStyles}>Service Description</Text>
                    <Input
                        keyboardType={'default'}
                        value={serviceData.s_desc}
                        onChangeText={(text) => setServiceData({...serviceData, s_desc: text})}
                        placeholder={'Enter service description (250 characters)'}
                        maxLength={250}
                        multiline={true}
                        textArea={true}
                    />
                </View>

                <Button
                    bgColor={colors.primary}
                    content={<Text style={{color: colors.textLight}}>Create Service</Text>}
                    func={handleSubmitClick}
                />
                
            </ScrollView>
        </View>
    )
}

export default ServiceCreateScreen

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
    addImageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    imageStyles: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        marginRight: 10,
    },
    imageDelIconStyles: {
        position: 'absolute',
        right: 15,
        top: 5,
    },
})