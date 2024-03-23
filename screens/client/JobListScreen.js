import { FlatList, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { getJobsByUserId } from '../../assets/data/jobs'
import JobItem from '../../components/app/JobItem'
import Header from '../../components/app/Header'
import NoData from '../../components/app/NoData'
import colors from '../../assets/colors/colors'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const JobListScreen = () => {
    const navigation = useNavigation();
    const [jobList, setjobList] = useState(null);

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                try {
                    let data = await getJobsByUserId();
                    setjobList(data);
                } catch (error) {
                    console.log('error at getting chats', error)
                    setjobList(null)
                }
            };
            getData();
        }, [])
    );

    const handleJobClick = (job_id) => {
        navigation.navigate('Single Job', {job_id})
    }

    return (
        <View style={styles.container}>
            <Header text={'My Jobs'}/>
            {(jobList && jobList.length > 0) ? (
            <FlatList
                data={jobList}
                renderItem={({item}) => <JobItem jobData={item} handleJobClick={handleJobClick} />}
                keyExtractor={(item) => item.chat_id.toString()}
            />
            ) : (
            <NoData text='No Jobs' />
            )}
        </View>
    )
}

export default JobListScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
    },
})