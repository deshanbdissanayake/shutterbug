import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileSec from './ProfileScreen/ProfileSec'
import InfoSec from './ProfileScreen/InfoSec'
import ServiceSec from './ProfileScreen/ServiceSec'
import FeedbackSec from './FeedbackSec'
import { getProviderById } from '../../assets/data/provider'
import PortfolioSec from './ProfileScreen/PortfolioSec'
import colors from '../../assets/colors/colors'

const ProfileScreen = ({ p_id }) => {
    const [profileData, setProfileData] = useState(null);

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
                    />
                    <InfoSec
                        description={profileData.description}
                    />
                    <ServiceSec
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