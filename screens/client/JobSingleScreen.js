import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../assets/colors/colors'
import MiniButton from '../../components/general/MiniButton'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { getJobByJobId } from '../../assets/data/jobs'
import ProviderSec from '../../components/other/ProviderSec'
import ChatBtnSec from '../../components/other/ChatBtnSec'
import InfoSec from '../../components/other/InfoSec'
import SplashScreen from '../SplashScreen'

const JobSingleScreen = () => {
  const navigation = useNavigation(null);

  const [jobData, setJobData] = useState();
  const [loading, setLoading] = useState(true);

  const backBtnClick = () => {
    navigation.goBack();
  }

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await getJobByJobId();
        setJobData(data);
        setLoading(false);
      } catch (error) {
        console.log('error getting job item data', data)
        setJobData(null);
      }
    }
    getData();
  },[])

  //add no data screen if data is not available
  if(loading){
    return <SplashScreen/>
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerWrapper}>
        <MiniButton
          func={backBtnClick}
          content={<AntDesign name="arrowleft" size={24} color={colors.textDark} />}
        />
        <Text style={styles.jobTokenTextStyles}>Job ID: # {}</Text>
        <Text style={styles.priceTextStyles}>$ {}</Text>
      </View>
      <View style={styles.serviceWrapper}>
        <View style={styles.serviceImageWrapper}></View>
        <View style={styles.serviceImageWrapper}></View>
      </View>
      <View style={styles.infoWrapper}>
        <InfoSec title={'Job Description'} description={''} />
      </View>
      <View style={styles.providerWrapper}>
        <ProviderSec
            p_id={jobData.provider_id}
            p_img={jobData.provider_img}
            fname={jobData.provider_fullname}
            uname={jobData.provider_username}
        />
      </View>
      <View style={styles.chatWrapper}>
      <ChatBtnSec
        p_id={jobData.provider_id}
        p_img={jobData.provider_img}
      />
      </View>
    </ScrollView>
  )
}

export default JobSingleScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
  },
})