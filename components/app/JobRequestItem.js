import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const JobRequestItem = ({data}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.categoryTextStyles}>{data.category}</Text>
            <Text style={styles.titleTextStyles}>{data.title}</Text>
            <View style={styles.nameTextWrapper}>
                <Text style={styles.fnameTextStyles}>{data.user_fullname}</Text>
                <Text style={styles.unameTextStyles}>{data.user_username}</Text>
            </View>
            <Text style={styles.descTextStyles}>{data.desc}</Text>
            <Text style={styles.budgetTextStyles}>{data.budget}</Text>
            <View style={styles.dateWrapper}>
                <Text style={styles.sdateTextStyles}>{data.sdate}</Text>
                <Text style={styles.edateTextStyles}>{data.edate}</Text>
            </View>
        </View>
    )
}

export default JobRequestItem

const styles = StyleSheet.create({
    container: {
        
    },
})