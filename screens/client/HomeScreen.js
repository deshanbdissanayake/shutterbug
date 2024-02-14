import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CategorySec from './HomeScreen/CategorySec';
import HeaderSec from './HomeScreen/HeaderSec';
import NewsSec from './HomeScreen/NewsSec';
import SearchSec from './HomeScreen/SearchSec';
import colors from '../../assets/colors/colors';

const HomeScreen = () => {
    const handleMoreClick = () => {};

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <HeaderSec title={'Hello Nathan !'} desc={'Your Location'} handleMoreClick={handleMoreClick} />
            </View>
            <View style={styles.bodyWrapper}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.bodyScrollWrapper}>
                    <View style={styles.searchWrapper}>
                        <SearchSec />
                    </View>
                    <View style={styles.newsWrapper}>
                        <NewsSec />
                    </View>
                    <View style={styles.catWrapper}>
                        <CategorySec />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
    },
    headerWrapper: {
        flex: 1,
        marginBottom: 10,
    },
    bodyWrapper: {
        flex: 9,
    },
    bodyScrollWrapper: {
        flexGrow: 1,
        paddingBottom: 10,
    },
    searchWrapper: {
        marginTop: 10,
    },
    newsWrapper: {
        marginTop:10,
        height: 150,
    },
    catWrapper: {},
});
