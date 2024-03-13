import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../general/Button'
import colors from '../../assets/colors/colors'

const JobRequestOfferItem = ({offerData, handleConfirm, handleReject, offerStatus}) => {

    const OfferDetails = () => {
        //check here
        return(
            <View style={styles.contentWrapper}>
                <Text>{offerData.provider_name}</Text>
                <Text>{offerData.provider_username}</Text>
                <Text>{offerData.provider_pro_pic}</Text>
                <Text>{offerData.s_rating}</Text>
                <Text>{offerData.number_of_reviews}</Text>
                
                <Text>{offerData.cat_name}</Text>
                <Text>{offerData.s_name}</Text>
                <Text>{offerData.s_type}</Text>
                <Text>{offerData.s_img}</Text>

                <Text>{offerData.offer_status}</Text>

                <Text>{offerData.pkg_name}</Text>
                <Text>{offerData.pkg_price}</Text>
                <Text>{offerData.pkg_desc}</Text>
                <Text>{offerData.highlight_1}</Text>
                <Text>{offerData.highlight_2}</Text>
                <Text>{offerData.highlight_3}</Text>
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
        flexDirection: 'row',
        marginTop: 10,
    },
    btnWrapper: {
        flex: 1,
        marginHorizontal: 2,
    },
})