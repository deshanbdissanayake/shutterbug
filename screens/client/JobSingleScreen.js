import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import Subtitle from '../../components/app/Subtitle'
import Button from '../../components/general/Button'
import CustomModal from '../../components/general/CustomModal'

const JobSingleScreen = () => {
  const navigation = useNavigation(null);

  const [jobData, setJobData] = useState();
  const [loading, setLoading] = useState(true);
  const [showCompleteModal, setShowCompleteModal] = useState(false);  
  const [showCaseModal, setShowCaseModal] = useState(false);

  const backBtnClick = () => {
    navigation.goBack();
  }

  const handleChatClick = (chat_id) => {
    navigation.navigate('Single Chat', chat_id);
  }

  const handleCaseClick = (job_id) => {
    console.log('hi')
  }

  const handleCompleteClick = (job_id) => {
    setShowCompleteModal(false);
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
    <>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.headerWrapper}>
            <MiniButton
              func={backBtnClick}
              content={<AntDesign name="arrowleft" size={24} color={colors.textDark} />}
            />
            <TouchableOpacity style={styles.chatBtnWrapper} onPress={() => handleChatClick(jobData.chat_id)}>
              <Text style={styles.chatBtnTextStyles}>Contact</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.serviceDetailsWrapper}>
            <Image style={styles.serviceImageStyles} source={{ uri: jobData.service_img }} />
            <View style={styles.serviceWrapper}>
              <View style={styles.serviceTextWrapper}>
                <View style={styles.serviceInfoTopWrapper}>
                  <Text style={styles.jobTokenTextStyles}>Job ID: # {jobData.job_token}</Text>
                  <Text style={styles.priceTextStyles}>$ {jobData.jof_price}</Text>
                </View>
                <View style={styles.serviceInfoBottomWrapper}>
                  <View style={styles.catWrapper}>
                    <Text style={styles.catTextStyles} numberOfLines={1}>{jobData.service_cat_type} | {jobData.service_cat}</Text>
                  </View>
                  <Text style={styles.serviceTextStyles} numberOfLines={2} >{jobData.service_name}</Text>
                  <Text style={styles.pkgTextStyles}  numberOfLines={1}>{jobData.pkg_name} Package</Text>
                </View>
              </View>
            </View>
          </View>
          <InfoSec title={'Job Description'} description={jobData.jof_desc} showAllStt={true} />
          <View style={styles.providerWrapper}>
            <Subtitle text={'Job Provider'} />
            <ProviderSec
                p_id={jobData.provider_id}
                p_img={jobData.provider_img}
                fname={jobData.provider_fullname}
                uname={jobData.provider_username}
            />
          </View>
        </View>
        <View style={styles.btnsWrapper}>
          <Button
            bgColor={colors.primary}
            content={<Text style={{color: colors.textLight}}>Mark as Complete</Text>}
            func={() => setShowCompleteModal(true)}
            bdr={colors.primary}
          />
          <Button
            content={<Text style={{color: colors.textDark}}>Open a Case</Text>}
            func={() => handleCaseClick()}
            bdr={colors.borderGrayDark}
          />
        </View>
      </ScrollView>
        {showCompleteModal && (
          <View style={styles.modalsWrapper}>
            <CustomModal 
              title={'Are you sure?'}
              content={'Mark this Job as Completed.'}
              okButtonText={'Mark as Completed'}
              pressOk={() => handleCompleteClick(jobData.job_id)}
              pressCancel={() => setShowCompleteModal(false)}
              cancelButtonText={'Cancel'}
            />
          </View>
        )}
        {showCaseModal && (
          <View style={styles.modalsWrapper}>
            <CustomModal 
              title={'Are you sure?'}
              content={'Open a case for this Job.'}
              cancelButtonText={'Cancel'}
              okButtonText={'Open a Case'}
            />
          </View>
        )}
    </>
  )
}

export default JobSingleScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatBtnWrapper: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.textDark,
    borderRadius: 5,
  },
  chatBtnTextStyles: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: colors.textDark,
  },
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
  catWrapper: {
    flexDirection: 'row',
  },
  catTextStyles: {
    fontSize: 12,
    textTransform: 'capitalize',
    color: colors.textGraySecondary,
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
  providerWrapper: {
    marginBottom: 20,
  },
  modalsWrapper:{
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.transparentDark,
    width: "100%",
    height: "100%",
  }
})