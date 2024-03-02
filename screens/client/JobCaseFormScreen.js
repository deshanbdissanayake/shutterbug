import { StyleSheet, Text, View, BackHandler, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import colors from '../../assets/colors/colors';
import { getJobByJobId, jobOpenCase } from '../../assets/data/jobs';
import SplashScreen from '../SplashScreen';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Alert from '../../components/general/Alert';
import MiniButton from '../../components/general/MiniButton';

const JobCaseFormScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    let job_id = route.params === undefined ? '' : route.params.job_id;

    const [jobData, setJobData] = useState(null);
    const [caseTitle, setCaseTitle] = useState(null);
    const [caseDesc, setCaseDesc] = useState(null);
    const [alert, setAlert] = useState({
        showAlert: false,
        type: null,
        msg: null,
        onClose: goBackFunc,
    });

    const resetAlertFunc = () => {
        setAlert({
            showAlert: false,
            type: null,
            msg: null,
            onClose: goBackFunc,
        })
    }

    const goBackFunc = () => {
        navigation.goBack();
    }

    useEffect(()=>{
        const getData = async () => {
            try {
                let data = await getJobByJobId(job_id);
                setJobData(data);
            } catch (error) {
                console.log('error job review getting job data', error)
            }
        }
        getData();
    },[job_id])

    const handleSubmitClick = async (job_id) => {
        if(!caseTitle || !caseDesc){
            setAlert({
                showAlert: true,
                type: 'warning',
                msg: 'Title and description fields must be filled!',
                onClose: resetAlertFunc,
            })
            return
        }

        try {
            let data = await jobOpenCase(job_id);
            if(data.stt == 'ok'){
                setAlert({
                    showAlert: true,
                    type: 'success',
                    msg: data.msg,
                    onClose: goBackFunc,
                })
            }else{
                setAlert({
                    showAlert: true,
                    type: 'error',
                    msg: data.msg,
                    onClose: resetAlertFunc,
                })
            }
        } catch (error) {
            console.error('error at opening job case', error)
            setAlert({
                showAlert: true,
                type: 'error',
                msg: 'Something went wrong!',
                onClose: resetAlertFunc,
            })
        }
    }

    // Use the conditional rendering properly
    if (!jobData || jobData.length <= 0) {
        return <SplashScreen />;
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <MiniButton 
                    func = {goBackFunc}
                    content = {<AntDesign name="arrowleft" size={24} color={colors.textDark} />}
                />
                <View style={styles.successMsgWrapper}>
                    <Text style={styles.jobTokenTextStyles}>Job ID: #{jobData.job_token}</Text>
                    <Text style={styles.successTitleTextStyles}>Open a case</Text>
                    <Ionicons name="warning-outline"  size={60} color={colors.white} style={styles.caseIconStyles} />
                    <Text style={styles.successMsgTextStyles}>If you encountered any issues or have concerns about the service provided, you can open a case here. Our team will review your case and work towards a resolution.</Text>
                </View>
                <View style={styles.reviewFormWrapper}>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Your Case Title</Text>
                        <Input
                            keyboardType={'default'}
                            value={caseTitle}
                            onChangeText={(text) => setCaseTitle(text)}
                            placeholder={'Enter your case title'}
                            maxLength={15}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Your Case Description</Text>
                        <Input
                            keyboardType={'default'}
                            value={caseDesc}
                            onChangeText={(text) => setCaseDesc(text)}
                            placeholder={'Enter your case description here about this service'}
                            multiline={true}
                            textArea={true}
                        />
                    </View>
                    <View style={styles.btnWrapper}>
                        <Button
                            bgColor={colors.primary}
                            content={<Text style={{color: colors.textLight}}>Submit</Text>}
                            func={() => handleSubmitClick(job_id)}
                            bdr={colors.primary}
                        />
                        <Button
                            content={<Text style={{color: colors.textDark}}>Cancel</Text>}
                            func={() => goBackFunc()}
                            bdr={colors.borderGrayLight}
                        />
                    </View>
                </View>
            </ScrollView>
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
        </KeyboardAvoidingView>
    )
}

export default JobCaseFormScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
    },
    modalsWrapper:{
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: colors.transparentDark,
        width: "100%",
        height: "100%",
    },
    starIconStyles: {
        marginRight: 5,
    },
    successMsgWrapper: {
        marginTop: 15,
        alignItems: 'center',
    },
    jobTokenTextStyles: {
        fontSize: 16, 
        fontWeight: '400',
        color: colors.textDark,
        marginBottom: 5,
    },
    successTitleTextStyles: {
        fontSize: 24,
        fontWeight: '500',
        color: colors.textDark,
        marginBottom: 15,
    },
    successMsgTextStyles: {
        color: colors.textDark,
        width: '100%',
        textAlign: 'justify',
        marginTop: 20,
        marginBottom: 10,
    },
    formGroup: {
        marginVertical: 10,
    },
    labelTextStyles: {
        marginBottom: 5,
        marginLeft: 2,
        color: colors.textDark,
    },
    starWrapper: {
        flexDirection: 'row',
    },
    btnWrapper: {
        marginTop: 20,
    },
    caseIconStyles: {
        backgroundColor: colors.danger,
        padding: 20,
        borderRadius: 50,
    },
})
