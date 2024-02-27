import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Input from '../../components/general/Input'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import MiniButton from '../../components/general/MiniButton'
import ServiceItem from '../../components/app/ServiceItem'
import { getServices } from '../../assets/data/service'

const SearchScreen = ({ searchItem = '' }) => {
    const [searchText, setSearchText] = useState(searchItem);
    const [serviceListOriginal, setServiceListOriginal] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            const services =  await getServices(); //make this await function
            setServiceListOriginal(services);
            searchFunc(searchItem);
        }
        getData();
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
                        renderItem={({ item }) => (
                            <ServiceItem 
                                handleServiceItemClick={handleServiceItemClick} 
                                s_id={item.s_id}
                                s_rating={item.s_rating}
                                number_of_reviews={item.number_of_reviews}
                                provider_name={item.provider_name}
                                s_name={item.s_name}
                                s_type={item.s_type}
                                main_pkg_price={item.main_pkg_price}
                                main_s_img={item.main_s_img}
                            />
                        )}
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
        paddingHorizontal: 10,
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