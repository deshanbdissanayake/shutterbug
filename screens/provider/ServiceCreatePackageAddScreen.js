import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/general/Button'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import Input from '../../components/general/Input'
import Select from '../../components/general/Select'
import { saveServicePackage } from '../../assets/data/service'

const ServiceCreatePackageAddScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { s_id } = route.params;
    const [btnLoading, setBtnLoading] = useState(false)
    const [pkgData, setPkgData] = useState({
        pkg_name: null,
        pkg_price: null,
        pkg_desc: null,
        is_main: 0,
        highlight_1: null,
        highlight_2: null,
        highlight_3: null,
    });

    const handleGoBack = () => {
        navigation.goBack();
    }

    const handleAddClick = async () => {
        setBtnLoading(true);
    
        try {
            if (!pkgData) {
                throw new Error('Something went wrong!');
            }
            
            const { pkg_name, pkg_price, pkg_desc, highlight_1, highlight_2, highlight_3 } = pkgData;
    
            if (!pkg_name || !pkg_price || !pkg_desc || !highlight_1 || !highlight_2 || !highlight_3) {
                throw new Error('All fields are required!');
            }
    
            if (isNaN(pkg_price)) {
                throw new Error('Enter a correct price!');
            }
    
            const data = await saveServicePackage();
    
            if (data.stt === 'ok') {
                Alert.alert('Successful', data.msg, [{ text: 'OK', onPress: () => navigation.goBack() }]);
            } else {
                Alert.alert('Error', data.msg);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
            console.error('Error at saving service package: ', error);
        } finally {
            setBtnLoading(false);
        }
    };
    

    return (
        <View style={styles.container}>
            <Header text={'Add New Package'} handleGoBack={handleGoBack}/>
            <ScrollView contentContainerStyle={styles.formWrapper} showsVerticalScrollIndicator={false}>
                <View style={styles.contentWrapper}>
                    <View style={styles.formWrapper}>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Package Type</Text>
                            <Select
                                value={pkgData.is_main}
                                onSelect={(text) => setPkgData(prevData => ({...prevData, is_main: text}))}
                                placeholder={'Select Package Type'}
                                options={[{label: 'Normal Package', value: 0}, {label: 'Main Package', value: 1}]}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Package Name</Text>
                            <Input
                                keyboardType={'default'}
                                value={pkgData.pkg_name}
                                onChangeText={(text) => setPkgData(prevData => ({...prevData, pkg_name: text }))}
                                placeholder={'Enter Package Name (max 30 characters)'}
                                maxLength={30}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Package Price</Text>
                            <Input
                                keyboardType={'numeric'}
                                value={pkgData.pkg_price}
                                onChangeText={(text) => setPkgData(prevData => ({...prevData, pkg_price: text }))}
                                placeholder={'Enter Package Price'}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Package Description</Text>
                            <Input
                                keyboardType={'default'}
                                value={pkgData.pkg_desc}
                                onChangeText={(text) => setPkgData(prevData => ({...prevData, pkg_desc: text }))}
                                placeholder={'Enter Package Description'}
                                multiline={true}
                                textArea={true}
                                maxLength={150}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Higlight Text 1</Text>
                            <Input
                                keyboardType={'default'}
                                value={pkgData.highlight_1}
                                onChangeText={(text) => setPkgData(prevData => ({...prevData, pkg_name: highlight_3 }))}
                                placeholder={'Enter Higlight Text (max 50 characters)'}
                                maxLength={50}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Higlight Text 2</Text>
                            <Input
                                keyboardType={'default'}
                                value={pkgData.highlight_2}
                                onChangeText={(text) => setPkgData(prevData => ({...prevData, pkg_name: highlight_3 }))}
                                placeholder={'Enter Higlight Text (max 50 characters)'}
                                maxLength={50}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.labelTextStyles}>Higlight Text 3</Text>
                            <Input
                                keyboardType={'default'}
                                value={pkgData.highlight_3}
                                onChangeText={(text) => setPkgData(prevData => ({...prevData, pkg_name: highlight_3 }))}
                                placeholder={'Enter Higlight Text (max 50 characters)'}
                                maxLength={50}
                            />
                        </View>
                    </View>
                    <Button
                        bgColor={colors.primary}
                        content={<Text style={{color: colors.textLight}}>Add New Package</Text>}
                        bdr={colors.primary}
                        func={handleAddClick}
                        loading={btnLoading}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default ServiceCreatePackageAddScreen

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
    formGroup: {
        marginVertical: 10,
    },
    labelTextStyles: {
        marginBottom: 5,
        marginLeft: 2,
        color: colors.textDark,
    },
})