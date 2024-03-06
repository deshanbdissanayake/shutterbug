import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Input from '../../components/general/Input'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import MiniButton from '../../components/general/MiniButton'
import ServiceItem from '../../components/app/ServiceItem'
import { getServices } from '../../assets/data/service'
import { useNavigation, useRoute } from '@react-navigation/native'
import NoData from '../../components/app/NoData'

const SearchScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    
    let searchItem = route.params === undefined ? '' : route.params.cat_name;
    
    const [searchText, setSearchText] = useState(searchItem);
    const [serviceListOriginal, setServiceListOriginal] = useState([]);
    const [serviceList, setServiceList] = useState([]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        const getData = async () => {
            const services =  await getServices();
            setServiceListOriginal(services);
        }
        getData();
    }, []);
    
    useEffect(()=>{
        searchFunc(searchText);
    },[serviceListOriginal])
    
    const handleServiceItemClick = (s_id) => {
        navigation.navigate('Service Single', { s_id })
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
                    {route.name == 'Search' ? (
                        null
                    ) : (
                        <View style={styles.backBtnWrapper}>
                            <MiniButton 
                                func = {handleGoBack}
                                content = {<AntDesign name="arrowleft" size={24} color={colors.textDark} />}
                            />
                        </View>
                    )}
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
                    {
                        (serviceList && serviceList.length > 0) ? (
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
                        ) : (
                            <NoData text={searchText === '' ? 'Enter Search Text' : 'No Services for '+ searchItem} />
                        )
                    }
                </View>
            </View>
        </KeyboardAvoidingView>
    ) 
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
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