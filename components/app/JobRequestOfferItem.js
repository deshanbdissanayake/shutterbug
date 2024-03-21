import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../general/Button'
import colors from '../../assets/colors/colors'
import { AntDesign } from '@expo/vector-icons'
import ShowAll from './ShowAll'

const JobRequestOfferItem = ({offerData, handleConfirm, handleReject, offerStatus}) => {
    const [showAll, setShowAll] = useState(false);

    const OfferDetails = () => {
        //check here
        return(
            <View style={styles.contentWrapper}>
                <View style={styles.providerWrapper}>
                    <Image style={styles.providerImageStyles} source={{ uri: offerData.provider_pro_pic }} />
                    <View style={styles.providerTextWrapper}>
                        <View style={styles.providerNameWrapper}>
                            <Text style={styles.providerNameTextStyles}>{offerData.provider_name}</Text>
                            <Text style={styles.providerUsernameTextStyles}>(@{offerData.provider_username})</Text>
                        </View>
                        <View style={styles.providerRatingWrapper}>   
                            <AntDesign name="star" size={14} color={colors.gold} /> 
                            <Text style={styles.providerRatingTextStyles}>{offerData.s_rating}</Text>
                            <Text style={styles.providerReviewsTextStyles}>| {offerData.number_of_reviews}</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Image style={styles.serviceImageStyles} source={{uri:offerData.s_img}} />
                    <View style={styles.serviceTextWrapper}>
                        <View style={styles.tableRow}>
                            <Text style={styles.serviceTitleTextStyles}>Type</Text>
                            <Text style={[styles.serviceTextStyles, styles.bb]}>{offerData.s_type}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.serviceTitleTextStyles}>Category</Text>
                            <Text style={[styles.serviceTextStyles, styles.bb]}>{offerData.cat_name}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.serviceTitleTextStyles}>Service</Text>
                            <Text style={[styles.serviceTextStyles, styles.bb]}>{offerData.s_name}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.serviceTitleTextStyles}>Package</Text>
                            <Text style={[styles.serviceTextStyles, styles.bb]}>{offerData.pkg_name}</Text>
                        </View>
                    </View>
                </View> 
                <Text style={styles.offerNoteTextStyles} numberOfLines={showAll ? null : 3}>{offerData.offer_note}</Text>
                <ShowAll showAll={showAll} setShowAll={setShowAll} />
            </View>
        )
    }


        
    if (!(offerStatus === 'active')) {
        if (!(offerData.offer_status === 'active')) {
            return (
                <View style={styles.container}>
                    <OfferDetails />
                </View>
            );
        }
    } else {
        return (
            <View style={styles.container}>
                <OfferDetails />
                <View style={styles.btnsWrapper}>
                    <View style={styles.btnWrapper}>
                        <Button
                            content={<Text style={{ color: colors.primary }}>Reject</Text>}
                            func={() => handleReject(offerData.offer_id)}
                            bgColor={colors.white}
                            bdr={colors.primary}
                        />
                    </View>
                    <View style={styles.btnWrapper}>
                        <Button
                            content={<Text style={{ color: colors.white }}>Accept</Text>}
                            func={() => handleConfirm(offerData.offer_id)}
                            bgColor={colors.primary}
                            bdr={colors.primary}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default JobRequestOfferItem

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: colors.bgLight,
    },
    btnsWrapper: {
        marginTop: 10,
        flexDirection: 'row',
    },
    btnWrapper: {
        flex: 1,
        marginHorizontal: 2,
    },
    providerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        marginBottom: 5,
    },
    providerImageStyles: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    providerTextWrapper: {
        marginLeft: 10,
    },
    providerNameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    providerNameTextStyles: {
        color: colors.textDark,
    },
    providerUsernameTextStyles: {
        marginLeft: 5,
        color: colors.textGraySecondary
    },
    providerRatingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    providerRatingTextStyles: {
        marginLeft: 5,
        color: colors.textGraySecondary,
        fontSize: 12,
    },
    providerReviewsTextStyles: {
        marginLeft: 5,
        color: colors.textGraySecondary,
        fontSize: 12,
    },
    serviceImageStyles: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 5,
        backgroundColor: colors.white,
    },
    serviceTextWrapper: {
        marginTop: 10,
    },
    serviceCategoryWrapper: {
        flexDirection: 'row',
    },
    tableRow: {
        flexDirection: 'row', 
        borderBottomWidth: 1,
        paddingVertical: 10,
        borderBottomColor: colors.borderGrayExtraLight,
    },
    serviceTitleTextStyles: {
        flex: 1,
        fontWeight: '400',
        color: colors.textDark,
    },
    serviceTextStyles: {
        flex: 2,
        fontWeight: '300',
        color: colors.textDark,
    },
    offerNoteTextStyles: {
        marginTop: 10,
        textAlign: 'justify',
        color: colors.textDark,
        fontWeight: '400',
    },
})