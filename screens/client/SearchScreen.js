import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import Input from '../../components/general/Input'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import MiniButton from '../../components/general/MiniButton'
import ServiceItem from '../../components/app/ServiceItem'
import { getServices } from '../../assets/data/client/service'

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [serviceList, setServiceList] = useState([]);

    useEffect(()=>{
        setServiceList(getServices);
    },[])

    const backBtnClick = () => {}

    return (
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
                        onChangeText = {(val) => setSearchText(val)}
                        placeholder = {'Search services'}
                        icon = {<Ionicons name='search' size={20} color={colors.textDark} />}
                        maxLength = {15}
                        borderColor = {colors.borderGrayLight}
                    />
                </View>
            </View>
            <View style={styles.searchResultsWrapper}>
                <FlatList
                    data={serviceList}
                    renderItem={({ item }) => <ServiceItem service={item} />}
                    keyExtractor={(item) => item.s_id.toString()}
                />
            </View>
        </View>
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