import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Input from '../../components/general/Input'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import MiniButton from '../../components/general/MiniButton'
import ServiceItem from '../../components/app/ServiceItem'
import { getServices } from '../../assets/data/client/service'

const SearchScreen = ({ searchItem = '' }) => {
    const [searchText, setSearchText] = useState(searchItem);
    const [serviceListOriginal, setServiceListOriginal] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const services =  getServices; //make this await function
            setServiceListOriginal(services);
            searchFunc(searchItem);
        }
        fetchData();
    }, []);
    
    const backBtnClick = () => {
        // Handle back button click here
    };
    
    const handleServiceItemClick = (s_id) => {
        console.log(s_id);
    };
    
    const searchFunc = (val) => {
        const lowerCaseVal = val.toLowerCase();
        setSearchText(val);
        const filteredList = serviceListOriginal.filter((e) => 
            e.s_name.toLowerCase().includes(lowerCaseVal) || 
            e.cat_name.toLowerCase().includes(lowerCaseVal)
        );
        setServiceList(val === '' ? [] : filteredList);
    };    
    

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <View style={styles.searchWrapper}>
                    <View style={styles.backBtnWrapper}>
                        <MiniButton 
                            func = {backBtnClick}
                            content = {<AntDesign name="arrowleft" size={24} color={colors.textDark} />}
                        />
                    </View>
                    <View style={styles.searchInputWrapper}>
                        <Input
                            keyboardType = {'default'}
                            value = {searchText}
                            onChangeText = {(val) => searchFunc(val)}
                            placeholder = {'Search services'}
                            icon = {<Ionicons name='search' size={20} color={colors.textDark} />}
                            maxLength = {15}
                            borderColor = {colors.borderGrayLight}
                            capitalize='none'
                        />
                    </View>
                </View>
                <View style={styles.searchResultsWrapper}>
                    <FlatList
                        data={serviceList}
                        renderItem={({ item }) => <ServiceItem service={item} handleServiceItemClick={handleServiceItemClick} />}
                        keyExtractor={(item) => item.s_id.toString()}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    ) 
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
    },
    searchWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchResultsWrapper: {
        flex: 8,
        marginTop: 10,
    },
    backBtnWrapper: {
        flex: 2,
    },
    searchInputWrapper: {
        flex: 10,
    },
    
})