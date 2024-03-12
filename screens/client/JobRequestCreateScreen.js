import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors/colors'
import Header from '../../components/app/Header'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/general/Button'
import Input from '../../components/general/Input'

const JobRequestCreateScreen = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    const [category, setCategory] = useState();

    const handleCreateRequest = () => {}

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Header text={'Create Job Request'} handleGoBack={handleGoBack} />
                
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