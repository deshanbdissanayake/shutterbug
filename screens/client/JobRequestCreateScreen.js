import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/general/Button'
import Input from '../../components/general/Input'
import Select from '../../components/general/Select'
import { getCategories } from '../../assets/data/category'
import LoadingScreen from '../LoadingScreen'
import DateTimePicker from '@react-native-community/datetimepicker';
import { createRequest } from '../../assets/data/requests'
import FormErrorMsg from '../../components/general/FormErrorMsg'

const JobRequestCreateScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [category, setCategory] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [budget, setBudget] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const getData = async () => {
        try {
            let data = await getCategories();
            let cat = data.map((val) => ({ label: val.name, value: val.id }));
            setCategory(cat);
            setLoading(false);
        } catch (error) {
            console.error('error at getting categories for job request create: ', error)
            setLoading(false);
        }
    }

    const resetForm = () => {
        setBtnLoading(false);
        setTitle(null);
        setDesc(null);
        setBudget(null);
        setSelectedCategory(null);
        setSdate(new Date());
        setEdate(new Date());
        setShowSdate(false);
        setShowEdate(false);
        setErrorMsg(null);
    }

    useEffect(()=>{
        getData();
        resetForm();
    },[])

    //=====================================================
    const [sdate, setSdate] = useState(new Date());
    const [edate, setEdate] = useState(new Date());
    const [showSdate, setShowSdate] = useState(false);
    const [showEdate, setShowEdate] = useState(false);

    const onChangeDate = (type, selectedDate) => {
        setShowSdate(false)
        setShowEdate(false)
        if(type == 'sdate'){
            setSdate(selectedDate);
        }else{
            setEdate(selectedDate);
        }
    };

    //=====================================================

    // submit form
    const handleCreateRequest = async () => {
        //validation
        if( category == null || title == null || desc == null || budget == null || selectedCategory == null || sdate == null ||edate == null){
            setErrorMsg('All fields are required!');
            return;
        }
        
        //submit
        submitFunc();
    }

    const submitFunc =  async () => {
        setBtnLoading(true);
        try {
            let formData = new FormData();

            formData.append('title', title );
            formData.append('desc', desc );
            formData.append('budget', budget );
            formData.append('category_id', selectedCategory );
            formData.append('sdate', sdate );
            formData.append('edate', edate );

            let data = await createRequest(formData);
            if(data.stt == 'ok'){
                Alert.alert('Successful', data.msg);
                handleGoBack();
            }else{
                Alert.alert('Failed', data.msg)
            }
        } catch (error) {
            console.error('error saving request: ', error)
        } finally {
            resetForm();
        }
    }

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Header text={'Create Job Request'} handleGoBack={handleGoBack} />
                    
                    <View style={styles.formWrapper}>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Select Category</Text>
                            <Select
                                value={selectedCategory}
                                onSelect={setSelectedCategory}
                                placeholder={'Select Category'}
                                options={category}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.formWrapper}>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Title</Text>
                            <Input
                                keyboardType={'default'}
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                                placeholder={'Enter Job Title'}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.formWrapper}>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Description</Text>
                            <Input
                                keyboardType={'default'}
                                value={desc}
                                onChangeText={(text) => setDesc(text)}
                                placeholder={'Enter Job Description'}
                                multiline={true}
                                textArea={true}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.formWrapper}>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Budget</Text>
                            <Input
                                icon={<Text style={{color: colors.textDark}}>$</Text>}
                                keyboardType={'number-pad'}
                                value={budget}
                                onChangeText={(text) => setBudget(text)}
                                placeholder={'Enter Job Budget'}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.formWrapper}>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Start Date</Text>
                            <Pressable onPress={() => setShowSdate(true)}>
                                <Input
                                    value={sdate.toLocaleDateString()}
                                    placeholder={'Enter Job Start Date'}
                                    editable={false}
                                />
                            </Pressable>
                            {showSdate && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={sdate}
                                    mode={'date'}
                                    onChange={(sd) => onChangeDate('sdate', new Date(sd.nativeEvent.timestamp))}
                                />
                            )}
                        </View>
                    </View>
                    
                    <View style={styles.formWrapper}>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>End Date</Text>
                            <Pressable onPress={() => setShowEdate(true)}>
                                <Input
                                    value={edate.toLocaleDateString()}
                                    placeholder={'Enter Job End Date'}
                                    editable={false}
                                />
                            </Pressable>
                            {showEdate && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={edate}
                                    mode={'date'}
                                    onChange={(sd) => onChangeDate('edate', new Date(sd.nativeEvent.timestamp))}
                                />
                            )}
                        </View>
                    </View>

                </View>
                {!errorMsg && (
                    <FormErrorMsg msg={errorMsg} />
                )}
                <Button
                    content={<Text style={{ color: colors.textLight }}>Create</Text>}
                    func={handleCreateRequest}
                    bgColor={colors.primary}
                    loading={btnLoading}
                    loaderIconColor={colors.textLight}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default JobRequestCreateScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.white,
        paddingVertical: 15,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
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