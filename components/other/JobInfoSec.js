import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InfoSec from '../../components/other/InfoSec'

import colors from '../../assets/colors/colors'

const JobInfoSec = ({jobData}) => {
  return (
    <View>
        <View style={styles.serviceDetailsWrapper}>
            <Image style={styles.serviceImageStyles} source={{ uri: jobData.service_img }} />
            <View style={styles.serviceWrapper}>
                <View style={styles.serviceTextWrapper}>
                <View style={styles.serviceInfoTopWrapper}>
                    {jobData.job_token && (
                        <Text style={styles.jobTokenTextStyles}>Job ID: # {jobData.job_token}</Text>
                    )}
                    <Text style={styles.priceTextStyles}>$ {jobData.jof_price}</Text>
                </View>
                <View style={styles.serviceInfoBottomWrapper}>
                    <Text style={styles.catTextStyles} numberOfLines={1}>{jobData.service_cat_type} | {jobData.service_cat}</Text>
                    <Text style={styles.serviceTextStyles} numberOfLines={2} >{jobData.service_name}</Text>
                    <Text style={styles.pkgTextStyles}  numberOfLines={1}>{jobData.pkg_name} Package</Text>
                </View>
                </View>
            </View>
        </View>
        <InfoSec title={'Job Description'} description={jobData.jof_desc} showAllStt={true} />
    </View>
  )
}

export default JobInfoSec

const styles = StyleSheet.create({
    serviceDetailsWrapper: {
        marginTop: 20,
    },
    serviceWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGrayExtraLight,
    },
    serviceImageStyles: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 5,
        marginBottom: 15,
    },
    serviceTextWrapper: {
        width: '100%',
    },
    serviceInfoTopWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: colors.bgLight,
        paddingVertical: 5,
        paddingHorizontal: 3,
    },
    jobTokenTextStyles: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.textDark,
    },
    priceTextStyles: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.textDark,
    },
    serviceInfoBottomWrapper: {
        justifyContent: 'space-between',
    },
    catTextStyles: {
        fontSize: 12,
        textTransform: 'capitalize',
        color: colors.textGraySecondary,
        marginBottom: 5,
    },
    serviceTextStyles: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.textDark,
    },
    pkgTextStyles: {
        paddingLeft: 2,
        fontSize: 12,
        fontWeight: '300',
        color: colors.textDark,
    },
    
})