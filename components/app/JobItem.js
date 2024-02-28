import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors';

const JobItem = ({ jobData, handleJobClick }) => {
    const {
        job_id,
        job_token,
        jof_price,
        time_remaining,
        status,
        job_date,
        provider_fullname,
        provider_username,
        service_name,
        service_img
    } = jobData

    const stt = status === 'active' ? time_remaining : status === 'done' ? 'Pending Payment' : 'Closed';
    const stt_styles = status === 'active' ? { backgroundColor:colors.success } : status === 'done' ? { backgroundColor: colors.danger } : { backgroundColor: colors.textGray };

    return (
        <TouchableOpacity style={styles.container} onPress={() => handleJobClick(job_id)}>
            <View style={styles.bottomWrapper}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.imageStyles} source={{ uri: service_img }} />
                </View>
                <View style={styles.textWrapper}>
                    <View style={styles.jobWrapper}>
                        <Text style={styles.jobTokenTextStyles}>ID: #{job_token}</Text>
                        <Text style={styles.priceTextStyles}>$ {jof_price}</Text>
                    </View>
                    <View>
                        <Text style={styles.serviceTextStyles} numberOfLines={1}>{service_name}</Text>
                        <Text style={styles.providerTextStyles} numberOfLines={1}>{provider_fullname} (@{provider_username})</Text>
                    </View>
                    <View style={styles.timeWrapper}>
                        <Text style={styles.dateTextStyles}>{job_date}</Text>
                        <View style={[styles.timeRemainingWrapper, stt_styles]}>
                            <Text style={styles.timeRemainingTextStyles}>{stt}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default JobItem

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrayLight,
    },
    jobWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    jobTokenTextStyles: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.textDark,
    },
    priceTextStyles: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.textDark,
    },
    imageWrapper: {
        flex: 1,
        paddingVertical: 10,
    },
    textWrapper: {
        flex: 3,
        paddingLeft: 12,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    imageStyles: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    serviceTextStyles: {
        fontSize: 16,
        fontWeight: '300',
        color: colors.te,
    },
    providerTextStyles: {
        fontSize: 12,
        color: colors.textGraySecondary,
    },
    timeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateTextStyles: {
        flex: 1,
        fontSize: 12,
        color: colors.textDark,
    },
    timeRemainingWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 5,
    },
    timeRemainingTextStyles: {
        fontSize: 12,
        color: colors.textLight,
    },
})