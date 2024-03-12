import { ScrollView, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import React, { useCallback, useState } from 'react'
import colors from '../../assets/colors/colors'
import MiniButton from '../../components/general/MiniButton'
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { getJobById, jobMarkAsComplete } from '../../assets/data/jobs'
import LoadingScreen from '../LoadingScreen'
import Button from '../../components/general/Button'
import CustomModal from '../../components/general/CustomModal'
import Alert from '../../components/general/Alert'
import JobInfoSec from '../../components/other/JobInfoSec'
import ProviderSec from '../../components/other/ProviderSec'
import Subtitle from '../../components/app/Subtitle'

const JobSingleScreen = ({job_id}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [jobData, setJobData] = useState();
  const [loading, setLoading] = useState(true);
  const [showCompleteModal, setShowCompleteModal] = useState(false);  
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [alert, setAlert] = useState({
    showAlert: false,
    type: null,
    msg: null,
    onClose: resetAlert
  })

  //use react native alert instead of custom alerts

  const handleGoBack = () => {
      navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
        const getData = async () => {
            try {
                let data = await getJobById('job', job_id);
                setJobData(data);
                setLoading(false);
                setShowCompleteModal(false);
                setShowCaseModal(false);
            } catch (error) {
              console.log('error getting job item data', data)
            }
        };
        getData();
    }, [])
  );

  const resetAlert = () => {
    setAlert({
      showAlert: false, 
      type: null, 
      msg: null,
      onClose: resetAlert
    })
  }

  const handleChatClick = (chat_id) => {
    navigation.navigate('Single Chat', chat_id);
  }

  const handleCompleteClick = async (job_id) => {
    setShowCaseModal(false);
    try {
      let data = await jobMarkAsComplete();
      if(data.stt == 'ok'){
        navigation.navigate("Job Review", { job_id })
      }else{
        setAlert({
          showAlert: true,
          type: 'error',
          msg: data.msg,
        })
      }
    } catch (error) {
      console.error('job mark as complete error', error)
      setAlert({
        showAlert: true,
        type: 'error',
        msg: 'Something went wrong!',
      })
    } 
  }

  const handleCaseClick = async (job_id) => {
    setShowCaseModal(false);
    navigation.navigate("Job Case", { job_id })
  }

  const handleInvoiceClick = async () => {
    navigation.navigate('Invoice View', job_id)
  }


  //add no data screen if data is not available
  if(loading){
    return <LoadingScreen/>
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.headerWrapper}>
            <MiniButton
              func={handleGoBack}
              content={<AntDesign name="arrowleft" size={24} color={colors.textDark} />}
            />
            <TouchableOpacity style={styles.chatBtnWrapper} onPress={() => handleChatClick(jobData.chat_id)}>
              <Text style={styles.chatBtnTextStyles}>Contact</Text>
            </TouchableOpacity>
          </View>
          <JobInfoSec jobData={jobData} />
          <Button
            content={<Text style={{color: colors.primary}}>View Invoice</Text>}
            func={handleInvoiceClick}
            bdr={colors.primary}
          />
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
              { jobData.case == 0 && jobData.status == 'active' ? (
                <>
                  <Button
                    bgColor={colors.primary}
                    content={<Text style={{color: colors.textLight}}>Mark as Complete</Text>}
                    func={() => setShowCompleteModal(true)}
                    bdr={colors.primary}
                  />
                  <Button
                    content={<Text style={{color: colors.textDark}}>Open a Case</Text>}
                    func={() => setShowCaseModal(true)}
                    bdr={colors.borderGrayDark}
                  />
                </>
              ) : (
                <View style={[styles.statusWrapper, {backgroundColor: jobData.case == 1 ? colors.lightRed : colors.lightBlue}]}>
                  <Text style={styles.statusTextStyles}>{jobData.case == 1 ? 'A Case has opened for this Job' : jobData.status == 'done' ? 'Marked as Completed' : 'Job Closed'}</Text>
                </View>
              )}
            </View>

      </ScrollView>
        {showCompleteModal && (
          <View style={styles.modalsWrapper}>
            <StatusBar backgroundColor={colors.textGraySecondary} barStyle="light-content" />
            <CustomModal 
              title={'Mark this Job as Completed'}
              content={'Are you sure?'}
              pressOk={() => handleCompleteClick(jobData.job_id)}
              okButtonText={'Mark as Completed'}
              pressCancel={() => setShowCompleteModal(false)}
              cancelButtonText={'Cancel'}
            />
          </View>
        )}

        {showCaseModal && (
          <View style={styles.modalsWrapper}>
            <StatusBar backgroundColor={colors.textGraySecondary} barStyle="light-content" />
            <CustomModal 
              title={'Open a case for this Job'}
              content={'Are you sure?'}
              pressOk={() => handleCaseClick(jobData.job_id)}
              okButtonText={'Open a Case'}
              pressCancel={() => setShowCaseModal(false)}
              cancelButtonText={'Cancel'}
            />
          </View>
        )}

        {alert.showAlert && (
          <View style={styles.modalsWrapper}>
            <StatusBar backgroundColor={colors.textGraySecondary} barStyle="light-content" />
            <Alert
              type={alert.type}
              msg={alert.msg}
              visible={alert.showAlert}
              onClose={alert.onClose}
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
  modalsWrapper:{
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.transparentDark,
    width: "100%",
    height: "100%",
  },
  statusWrapper: {
      paddingVertical: 15,
  },
  statusTextStyles: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textLight,
      textAlign: 'center',
  },
  providerWrapper: {
    marginBottom: 20,
    marginTop: 10,
  },

})