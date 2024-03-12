import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors/colors'
import ShowAll from './ShowAll'
import { AntDesign } from '@expo/vector-icons'
import MiniButton from '../general/MiniButton'

const JobRequestItem = ({data, isClient = true, handleDelete = null}) => {
    const [showAll, setShowAll] = useState(false);

    return (
        <View style={styles.container}>
            {!isClient && (
                <View style={styles.nameTextWrapper}>
                    <Text style={styles.fnameTextStyles}>{data.user_fullname}</Text>
                    <Text style={styles.unameTextStyles}>(@{data.user_username})</Text>
                </View>
            )}
            <Text style={styles.categoryTextStyles}>{data.category}</Text>
            <Text style={styles.titleTextStyles}>{data.title}</Text>
            <Text style={styles.budgetTextStyles}>Budget: ${data.budget}</Text>
            <Text style={styles.descTextStyles} numberOfLines={showAll ? null : 3}>{data.desc}</Text>
            <ShowAll showAll={showAll} setShowAll={setShowAll}/>
            <View style={styles.dateWrapper}>
                <Text style={styles.sdateTextStyles}>Start Date: {data.sdate}</Text>
                <Text style={styles.edateTextStyles}>End Date: {data.edate}</Text>
            </View>

            {isClient && (
                <View style={styles.btnWrapper}>
                    <MiniButton
                        func={() => handleDelete(data.req_id)}
                        content={<AntDesign name="delete" size={24} color={colors.primary} />}
                    />
                </View>
            )}
        </View>
    )
}

export default JobRequestItem

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: colors.lightGray,
        borderRadius: 5,
    },
    categoryTextStyles: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: colors.white,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: colors.textDark,
    },
    titleTextStyles: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.textDark,
        marginBottom: 10,
    },
    nameTextWrapper: {
        flexDirection: 'row',
    },
    fnameTextStyles: {
        fontSize: 12,
        fontWeight: '300',
        color: colors.textDark,
    },
    unameTextStyles: {
        marginLeft: 5,
        fontSize: 12,
        fontWeight: '300',
        color: colors.textGraySecondary,
    },
    descTextStyles: {
        fontWeight: '300',
        color: colors.textDark,
        textAlign: 'justify',
    },
    budgetTextStyles: {
        color: colors.textGraySecondary,
        marginBottom: 5,
    },
    dateWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    sdateTextStyles: {
        fontWeight: '400',
        color: colors.textDark,
    },
    edateTextStyles: {
        fontWeight: '400',
        color: colors.textDark,
    },
    btnWrapper: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
})