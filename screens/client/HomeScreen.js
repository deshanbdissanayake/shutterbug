import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CategorySec from '../../components/other/CategorySec';
import HeaderSec from '../../components/other/HeaderSec';
import NewsSec from '../../components/other/NewsSec';
import SearchSec from '../../components/other/SearchSec';
import colors from '../../assets/colors/colors';
import FloatingMenu from '../../components/other/FloatingMenu';

const HomeScreen = () => {

    const [isShowFloatingMenu, setIsShowFloatingMenu] = useState(false);

    const handleMoreClick = () => {
        setIsShowFloatingMenu(!isShowFloatingMenu);
    };

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
            {/* for floating menu */}
            {isShowFloatingMenu ? (
                <FloatingMenu />
            ) : (null)}
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
