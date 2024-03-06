import { ScrollView, StyleSheet, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileSec from '../../components/other/ProfileSec'
import InfoSec from '../../components/other/InfoSec'
import ServicesListSec from '../../components/other/ServicesListSec'
import PortfolioSec from '../../components/other/PortfolioSec'
import FeedbackSec from '../../components/other/FeedbackSec'
import { getProviderById } from '../../assets/data/provider'
import colors from '../../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'
import { useTabBarVisibility } from '../../layouts/TabBarContext'

const ProfileScreen = ({ p_id }) => {
    const navigation = useNavigation();
    const [profileData, setProfileData] = useState(null);

    /*========================================================================= */
    // hide tab bar
    const { setTabBarVisible } = useTabBarVisibility()
    useEffect(() => {
        setTabBarVisible(false);
        
        const backAction = () => {
            setTabBarVisible(true);
            navigation.goBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [])

    const handleGoBack = () => {
        setTabBarVisible(true);
        navigation.goBack();
    };
    /*========================================================================= */

    useEffect(() => {
        const getData = async () => {
            try {
                let data = await getProviderById(p_id);
                setProfileData(data);
            } catch (error) {
                console.log('error getting profile data: ', error)
                setProfileData(null);
            }
        }
        getData();
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {profileData && (
                <>
                    <ProfileSec 
                        p_id={profileData.id}
                        pro_pic={profileData.pro_pic}
                        fullname={profileData.fullname}
                        username={profileData.username}
                        p_ratings={profileData.p_ratings}
                        number_of_reviews={profileData.number_of_reviews}
                        handleGoBack={handleGoBack}
                    />
                    <InfoSec
                        title={'About Me'}
                        description={profileData.description}
                    />
                    <ServicesListSec
                        services={profileData.services}
                    />
                    <PortfolioSec
                        portfolio={profileData.portfolio}
                    />
                    <FeedbackSec
                        feedbacks={profileData.feedbacks}
                    />
                </>
            )}
        </ScrollView>
    );
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
    }
})