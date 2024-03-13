import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import JobInfoSec from '../../components/other/JobInfoSec'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getJobById } from '../../assets/data/jobs'
import LoadingScreen from '../LoadingScreen'
import Button from '../../components/general/Button'
import Header from '../../components/app/Header'

const CustomOfferViewScreen = ({offer_id}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const user_id = 1; // Assume user ID retrieval from async storage

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [jobData, setJobData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const getData = async () => {
          try {
              let data = await getJobById('offer', offer_id);
              setJobData(data);
              setLoading(false);
          } catch (error) {
              console.log('error getting job item data', data)
          }
      };
      getData();
  }, [])

  const handleAccept = (job_id) => {
    navigation.navigate('Payement Methods', job_id)
  }

  const handleReject = () => {
    // navigate to chat
  }

  const handleCancel = () => {
    // navigate to chat
  }

   //add no data screen if data is not available
   if(loading){
    return <LoadingScreen/>
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View>
        <Header text={'Custom Offer'} handleGoBack={handleGoBack} />
        <JobInfoSec jobData={jobData} />
      </View>
      {
        user_id !== jobData.provider_id ? (
          <View>
            <Button
              bgColor={colors.primary}
              content={<Text style={{color: colors.textLight}}>Accept Offer</Text>}
              func={() => handleAccept(jobData.job_id)}
              bdr={colors.primary}
            />
            <Button
              content={<Text style={{color: colors.primary}}>Reject Offer</Text>}
              func={() => handleReject(jobData.job_id)}
              bdr={colors.border}
            />
          </View>
        ) : (
          <Button
            content={<Text style={{color: colors.primary}}>Cancel Offer</Text>}
            func={handleCancel}
            bdr={colors.border}
          />
        )
      }
      
    </ScrollView>
  )
}

export default CustomOfferViewScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
    justifyContent: 'space-between',
  },
})