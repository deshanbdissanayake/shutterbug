import { StyleSheet, Text, View, BackHandler, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import colors from '../../assets/colors/colors';
import { getJobByJobId, saveRatings } from '../../assets/data/jobs';
import SplashScreen from '../SplashScreen';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Alert from '../../components/general/Alert';
import { useTabBarVisibility } from '../../layouts/TabBarContext'

const JobReviewFormScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    let job_id = route.params === undefined ? '' : route.params.job_id;

    const [jobData, setJobData] = useState(null);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [alert, setAlert] = useState({
        showAlert: false,
        type: null,
        msg: null,
        onClose: handleGoBack,
    });

    /*========================================================================= */
    // hide tab bar
    const { setTabBarVisible } = useTabBarVisibility()
    useEffect(() => {
        setTabBarVisible(false);
        
        const backAction = () => {
        setTabBarVisible(true);
        navigation.goBack();
        return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [])

    const handleGoBack = () => {
        setTabBarVisible(true);
        navigation.goBack();
    };
    /*========================================================================= */

    const resetAlertFunc = () => {
        setAlert({
            showAlert: false,
            type: null,
            msg: null,
            onClose: handleGoBack,
        })
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

    useEffect(() => {
        const backAction = () => {
            // Navigate to Job List screen but prevent going back
            navigation.navigate('Job List');
            return true;
        };

        // Add event listener for hardware back button press
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        // Clean up function
        return () => backHandler.remove();
    }, [navigation]);

    const handleSubmitClick = async (job_id) => {
        if(rating == 0 || feedback == ''){
            setAlert({
                showAlert: true,
                type: 'warning',
                msg: 'Ratings and Feedback fields must be filled!',
                onClose: resetAlertFunc,
            })
            return
        }

        try {
            let data = await saveRatings(job_id);
            if(data.stt == 'ok'){
                setAlert({
                    showAlert: true,
                    type: 'success',
                    msg: data.msg,
                    onClose: handleGoBack,
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
            console.error('error at saving ratings', error)
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
                <View style={styles.successMsgWrapper}>
                    <Text style={styles.jobTokenTextStyles}>Job ID: #{jobData.job_token}</Text>
                    <Text style={styles.successTitleTextStyles}>Successful</Text>
                    <Ionicons name="checkmark-circle" size={120} color={colors.lightGreen} />
                    <Text style={styles.successMsgTextStyles}>Thank you for using our services. We hope you're satisfied with the outcome. Your feedback helps us improve our service quality. Please take a moment to rate your experience and provide any additional feedback.</Text>
                </View>
                <View>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Your Rating</Text>
                        <View style={styles.starWrapper}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
                                    {rating <= index ? (
                                        <AntDesign name="staro" size={36} color={colors.textGraySecondary} style={styles.starIconStyles} />
                                        ) : (
                                        <AntDesign name="star" size={36} color={colors.gold} style={styles.starIconStyles} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.labelTextStyles}>Your Feedback</Text>
                        <Input
                            keyboardType={'default'}
                            value={feedback}
                            onChangeText={(text) => setFeedback(text)}
                            placeholder={'Enter your feedback here about this service'}
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
                            content={<Text style={{color: colors.textDark}}>Skip</Text>}
                            func={() => handleGoBack()}
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

export default JobReviewFormScreen

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
        marginTop: 25,
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
        marginBottom: 5,
    },
    successMsgTextStyles: {
        color: colors.textDark,
        width: '100%',
        textAlign: 'justify',
        marginVertical: 10,
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
})
