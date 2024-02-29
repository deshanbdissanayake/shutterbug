import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const JobReviewFormScreen = () => {
    const route = useRoute();
    let job_id = route.params === undefined ? '' : route.params.job_id;
    return (
        <View style={styles.container}>
            <Text>JobReviewFormScreen {job_id}</Text>
        </View>
    )
}

export default JobReviewFormScreen

const styles = StyleSheet.create({})