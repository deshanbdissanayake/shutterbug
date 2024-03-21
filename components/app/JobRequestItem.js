import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../assets/colors/colors'
import ShowAll from './ShowAll'
import { AntDesign } from '@expo/vector-icons'
import MiniButton from '../general/MiniButton'
import Button from '../general/Button'

const JobRequestItem = ({data, isClient, handleDelete = null, handleApply = null, handleView = null, noButtons = false}) => {
    const [showAll, setShowAll] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <View>
                    {!isClient && (
                        <View style={styles.nameTextWrapper}>
                            <Text style={styles.fnameTextStyles}>{data.user_fullname}</Text>
                            <Text style={styles.unameTextStyles}>(@{data.user_username})</Text>
                        </View>
                    )}
                    <Text style={styles.titleTextStyles}>{data.title}</Text>
                </View>
                <Text style={styles.categoryTextStyles}>{data.category}</Text>
            </View>
            <Text style={styles.budgetTextStyles}>Budget: ${data.budget}</Text>
            <Text style={styles.descTextStyles} numberOfLines={showAll ? null : 3}>{data.desc}</Text>
            <ShowAll showAll={showAll} setShowAll={setShowAll}/>
            <View style={styles.dateWrapper}>
                <Text style={styles.sdateTextStyles}>Start Date: {data.sdate}</Text>
                <Text style={styles.edateTextStyles}>End Date: {data.edate}</Text>
            </View>     
                {(data.offer_status == 'confirm') && (
                    <View style={[styles.btnWrapper, {marginTop: 10}]}>
                        <Button
                            content={<Text style={{color: colors.success}}>Offer Confirmed</Text>}
                            func={() => (!noButtons && isClient) ? handleView(data.req_id) : null}
                            bdr={colors.success}
                        />
                    </View>
                )}

                {!noButtons && (
                    isClient ? (
                        !(data.offer_status == 'confirm') && (
                            <View style={styles.btnsWrapper}>
                                <View style={styles.btnWrapper}>
                                    <Button
                                        content={<Text style={{color: colors.textDark}}>View Offers</Text>}
                                        func={() => handleView(data.req_id)}
                                        bdr={colors.textDark}
                                    />
                                </View>
                                <View style={styles.btnWrapper}>
                                    <Button
                                        content={<Text style={{color: colors.primary}}>Delete</Text>}
                                        func={() => handleDelete(data.req_id)}
                                        bdr={colors.primary}
                                    />
                                </View>
                            </View>
                        )
                    ) : (
                        <View style={styles.btnsWrapper}>
                            <Button
                                content={<Text style={{ color: data.apply_status === 'active' ? colors.primary : colors.success }}>
                                    {data.apply_status === 'active' ? 'Apply' : 'Already Applied'}
                                </Text>}
                                func={() => data.apply_status === 'active' ? handleApply(data.req_id) : null}
                                bdr={data.apply_status === 'active' ? colors.primary : colors.success}
                            />
                        </View>
                    )
                )}
        </View>
    )
}

export default JobRequestItem

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: colors.lightGray,
        borderRadius: 5,
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryTextStyles: {
        backgroundColor: colors.white,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: colors.textDark,
    },
    titleTextStyles: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.textDark,
        paddingBottom: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.textGraySecondary,
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
    btnsWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnWrapper: {
        flex: 1,
        marginHorizontal: 2,
    },
})