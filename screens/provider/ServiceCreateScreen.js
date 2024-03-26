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
import { AntDesign } from '@expo/vector-icons'
import Button from '../../components/general/Button'
import Subtitle from '../../components/app/Subtitle'

const ServiceCreateScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const handleGoBack = () => {
        navigation.goBack();
    }
    
    const { s_id } = route.params;
    const isFirstLoad = useRef(true); // useRef to track initial load


    const title = s_id ? 'Update' : 'Create New';
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState(null);
    const [serviceCatOrg, setServiceCatOrg] = useState(null);
    const [serviceCat, setServiceCat] = useState(null);
    const [formData, setFormData] = useState({
        s_id: null,
        s_type: 'photography',
        cat_id: null,
        s_name: null,
        s_desc: null,
        s_images: [
            {
                si_id: 1,
                img: 'https://shutterbug.introps.com/documents/service/test-1.jpg',
                is_main: 1,
            },
            {
                si_id: 2,
                img: 'https://shutterbug.introps.com/documents/service/test-2.jpg',
                is_main: 0,
            },
            {
                si_id: 3,
                img: 'https://shutterbug.introps.com/documents/service/test-3.jpg',
                is_main: 0,
            },
            {
                si_id: 4,
                img: 'https://shutterbug.introps.com/documents/service/test-3.jpg',
                is_main: 0,
            },
            {
                si_id: 5,
                img: 'https://shutterbug.introps.com/documents/service/test-3.jpg',
                is_main: 0,
            },
        ],
    });

    const serviceTypes = [
        {value: 'photography', label: 'Photography'},
        {value: 'videography', label: 'Videography'},
    ]

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

    const getServiceCategories = async () => {
        try {
            let data = await getCategories();
            setServiceCatOrg(data);
        } catch (error) {
            console.error('Error at service create provider service category:', error);
        }
    };

    useEffect(() => {
        if (!isFirstLoad.current) {
            setFormData(prevData => ({ ...prevData, cat_id: null }));
        } else {
            isFirstLoad.current = false; // Set isFirstLoad to false after initial load
        }
    }, [formData.s_type]);
    
    useEffect(() => {
        getServiceCategoriesByTypes(formData.s_type);
    }, [serviceCatOrg, formData.s_type]);

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
    
    const getServiceData = async () => {
        try {
            let data = await getServiceById(s_id);
            setService(data);
        } catch (error) {
            console.error('Error at getting updated service:', error);
        }
    };
    
    const handleImageSelect = () => {}

    const handleSubmitClick = async () => {
        let formData = new FormData();
    
        try {
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
                        {formData.s_images && formData.s_images.length > 0 && (
                            formData.s_images.map((imgData, index) => (
                                <Image key={index} style={styles.imageStyles} source={{ uri: imgData.img }} />
                            ))
                        )}
                    </ScrollView>
                </View>


                <View style={styles.formGroup}>
                    <Text style={styles.labelTextStyles}>Service Type</Text>
                    <Select
                        value={formData.s_type}
                        onSelect={(text) => setFormData({...formData, s_type: text})}
                        placeholder={'Select Service Type'}
                        options={serviceTypes}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.labelTextStyles}>Service Category</Text>
                    <Select
                        value={formData.cat_id}
                        onSelect={(text) => setFormData({...formData, cat_id: text})}
                        placeholder={'Select Service Category'}
                        options={serviceCat}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.labelTextStyles}>Service Name</Text>
                    <Input
                        keyboardType={'default'}
                        value={formData.s_name}
                        onChangeText={(text) => setFormData({...formData, s_name: text})}
                        placeholder={'Enter service name'}
                        maxLength={50}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.labelTextStyles}>Service Description</Text>
                    <Input
                        keyboardType={'default'}
                        value={formData.s_desc}
                        onChangeText={(text) => setFormData({...formData, s_desc: text})}
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
})