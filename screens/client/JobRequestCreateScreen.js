import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/general/Button'
import Input from '../../components/general/Input'
import Select from '../../components/general/Select'
import { getCategories } from '../../assets/data/category'
import LoadingScreen from '../LoadingScreen'

const JobRequestCreateScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    useEffect(()=>{
        const getData = async () => {
            try {
                let data = await getCategories();
                setCategory(data);
                setLoading(false);
            } catch (error) {
                console.error('error at getting categories for job request create: ', error)
                setLoading(false);
            }
        }
        getData();
    },[])

    const handleCreateRequest = () => {}

    if(loading){
        return <LoadingScreen/>
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Header text={'Create Job Request'} handleGoBack={handleGoBack} />
                
                <View style={styles.formWrapper}>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Select Category</Text>
                        <Select
                            value={selectedCategory}
                            onSelect={setSelectedCategory}
                            placeholder={'Select Category'}
                            options={[{label: 'hi', value: '1'}, {label: 'bye', value: '2'}]}
                        />
                    </View>
                </View>
                
                <View style={styles.formWrapper}>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Select Category</Text>
                        <Input
                            keyboardType={'default'}
                            value={category}
                            onChangeText={(text) => setCategory(text)}
                            placeholder={'Enter your feedback here about this service'}
                        />
                    </View>
                </View>

            </View>
            <Button
                content={<Text style={{ color: colors.textLight }}>Create</Text>}
                func={handleCreateRequest}
                bgColor={colors.primary}
            />
        </ScrollView>
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