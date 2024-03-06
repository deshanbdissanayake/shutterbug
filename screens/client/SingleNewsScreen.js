import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, BackHandler } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import MiniButton from '../../components/general/MiniButton'
import colors from '../../assets/colors/colors';
import { getNewsById } from '../../assets/data/news';
import SplashScreen from '../SplashScreen';
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTabBarVisibility } from '../../layouts/TabBarContext'

const SingleNewsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    
    const [newsItem, setNewsItem] = useState({});
    const [loading, setLoading] = useState(true);

    const newsID  = route.params.news_id;

    const handleGoBack = () => {
        navigation.goBack();
    };

    // Getting news data by ID
    const fetchNewsData = async () => {
        try{
            const newsData = await getNewsById(newsID);
            setNewsItem(newsData);
            setLoading(false);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        fetchNewsData();
    }, []);

    if(loading){ // when fetching data
        return(
            <SplashScreen />
        )
    }else{// after loding data
        return (
            <View style={styles.container}>
                <View style={styles.newsHeadingWrapper}>
                    <View style={styles.backButtonWrapper}>
                        <MiniButton 
                            func = {handleGoBack}
                            content = {<AntDesign name="arrowleft" size={24} color={colors.textDark} />}
                        />
                    </View>
                    <View style={styles.newsTitleWrapper}>
                        <Text style={styles.heading} numberOfLines={2} ellipsizeMode='tail'>${newsItem.title}</Text>
                    </View>
                </View>
                <View style={styles.newsContentWrapper}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                        <Image 
                            source={{ uri: newsItem.image }} 
                            style={styles.image} 
                            resizeMode="cover" 
                        />
                        <Text style={styles.newsSubtitle}>{newsItem.sub_title}</Text>
                        <Text style={styles.newsText}>{newsItem.news}</Text>
                        <Text style={styles.newsDescription}>{newsItem.description}</Text>
                    </ScrollView>
                </View>
            </View>
        )
    }

}

export default SingleNewsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
    },
    newsHeadingWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButtonWrapper: {
        flex: 0.15,
    },
    newsTitleWrapper: {
        flex: 0.85,
        color: '#fff',
        textAlign: 'justify'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    },
    scrollViewContent:{
        flexGrow: 1,
    },
    newsContentWrapper: {
        flex: 8,
        marginTop: 5,
    },
    image: {
        width: '100%',
        height: 200,
    },
    newsSubtitle: {
        marginTop: 10,
        textAlign: 'justify',
        fontSize: 20,
        color: colors.primaryDark,
    },
    newsText: {
        marginTop: 10,
        textAlign: 'justify',
        fontSize: 16,
        color: colors.textDark,
    },
    newsDescription: {
        marginTop: 10,
        textAlign: 'justify',
        color: colors.textGraySecondary,
    },
})