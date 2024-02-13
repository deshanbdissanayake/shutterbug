import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'
import HeaderSec from './HomeScreen/HeaderSec'
import SearchSec from './HomeScreen/SearchSec'
import NewsSec from './HomeScreen/NewsSec'
import CategorySec from './HomeScreen/CategorySec'

const HomeScreen = () => {
    const handleMoreClick = () => {}

    return (
        <View style={styles.container}>
            <View style={styles.headerSecStyles}>
                <HeaderSec name={'Nathan'} location={'Your Location'} handleMoreClick={handleMoreClick} />
            </View>
            <View style={styles.searchSecStyles}>
                <SearchSec />
            </View>
            <View style={styles.newsSecStyles}>
                <NewsSec />
            </View>
            <View style={styles.categorySecStyles}>
                <CategorySec/>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
    },
    headerSecStyles: {
        flex: 1,
    },
    searchSecStyles: {
        flex: 1,
    },
    newsSecStyles: {
        flex: 3,
    },
    categorySecStyles: {
        flex: 4,
    },
})