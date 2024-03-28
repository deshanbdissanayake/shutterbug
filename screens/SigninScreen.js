import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, Pressable, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../assets/colors/colors';
import Button from '../components/general/Button';
import Input from '../components/general/Input';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import Alert from '../components/general/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn, forgotPassword, emailVerification, reqNewOtp } from '../assets/data/auth';
import { useAppContext } from '../layouts/AppContext';
import LoadingScreen from './LoadingScreen';
import moment from 'moment-timezone';

const SigninScreen = ({ navigation }) => {

    const { setIsLoggedIn } = useAppContext();

    // form states
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [logInButtonLoading, setLogInButtonLoading] = useState(false);

    // alert states
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("error");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");

    //page loading states
    const [isLoading, setIsLoading] = useState(true);

    //for otp verifications
    const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [otpTimeRemaining, setOtpTimeRemaining] = useState("0:00");
    const [showRequestOtp, setShowRequestOtp] = useState(false);

    // for forget password
    const [isPasswordForget, setIsPasswordForget] = useState(false);

    //useeffect function
    useEffect(() => {
        setIsLoading(false);
    }, []);

    const setToken = async (data) => {
        try{
            await AsyncStorage.setItem("shutterbug-app-login-token", data.token);
            await AsyncStorage.setItem("shutterbug-sessionData", JSON.stringify(data));
            return true;
        }catch(error){
            return false;
        }
    }

    //for otp timer
    const start_timer = (timeString) => {
        const currentTime = moment().tz('Asia/Colombo');
        const givenTime = moment.tz(timeString, 'YYYY-MM-DD HH:mm:ss', 'Asia/Colombo');
        const difference = givenTime.diff(currentTime);

        const differenceInSeconds = Math.floor(difference / 1000);

        if(differenceInSeconds <= 0){
        setOtpTimeRemaining("0:00");
        setShowRequestOtp(true);
        return;
        }

        const minutes = Math.floor(differenceInSeconds / 60);
        const seconds = differenceInSeconds % 60;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

        setOtpTimeRemaining(minutes + `:` + formattedSeconds);

        setTimeout(() => {
        start_timer(timeString);
        }, 1000);
    }

    // when click on sign in button
    const handleLoginClick = async () => {
        if(userName == "" || password == ""){
            setAlertTitle("Error!!");
            setAlertMessage("Please enter all required details.");
            setShowAlert(true);
            return;
        }

        // to enable loading
        setIsLoading(true);

        signIn(userName, password).then((data) => {
            if(data.stt == "success"){
                setToken(data["data"]).then((res) => {
                    // to remove loading
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 100);

                    if(res){
                        setLogInButtonLoading(true);
                        setTimeout(function(){
                            setIsLoggedIn(true);
                        }, 1000);
                    }else{
                        setAlertMessage("Something went wrong...");
                        setAlertTitle("Error!!");
                        setAlertType("error");
                        setShowAlert(true);
                    }
                })
            }else{
                // to remove loading
                setTimeout(() => {
                    setIsLoading(false);
                }, 100);

                if(data.data != "" && data.data.email_verification == "no"){
                    setIsVerifyingEmail(true);
                    start_timer(data.data.otp_exp);
                    return;
                }

                setAlertMessage(data.msg[0]);
                setAlertTitle(<Text style={{textTransform: "capitalize"}}>{data.stt}!!</Text>);
                setAlertType(data.stt);
                setShowAlert(true);
            }
        })
    };

    //when password forgot
    const handleForgotPwClick = () => {
        if(userName == ""){
            setAlertTitle("Email is required");
            setAlertMessage("Please enter your email in the provided text field and then click on the Forgot Password?");
            setAlertType("info");
            setShowAlert(true);
            return;
        }

        // to enable loading
        setIsLoading(true);

        forgotPassword(userName).then((res) => {
            if(res.stt == "success"){
                setIsVerifyingEmail(true);
                start_timer(res.data.otp_exp);
                setIsPasswordForget(true);
            }else{
                setAlertTitle("Error!!");
                setAlertMessage(res.msg[0]);
                setAlertType("error");
                setShowAlert(true);
            }

            // to remove loading
            setTimeout(() => {
                setIsLoading(false);
            }, 100);
        })
    }

    const handleGoogleClick = async () => {
        // for google login
    }

    const handleRegClick = () => {
        navigation.navigate('Sign Up');
    }

    // to hide the alert
    const hideAlert = () => {
        setShowAlert(false);
        setAlertMessage("");
        setAlertTitle("");
        setAlertType("error");
    }

    // email verification and when success directly sign in
    const veryfyEmail = async () => {
        setIsLoading(true);
        const em = await AsyncStorage.getItem("shutterbug-emailToVerify");

        emailVerification(otpValue, em).then(async (data) => {
            if(data.stt == "success"){
                if(isPasswordForget){
                    setIsVerifyingEmail(false);
                    setIsLoading(false);
                    return;
                }

                const un = await AsyncStorage.getItem("shutterbug-emailToVerify");
                const pw = await AsyncStorage.getItem("shutterbug-temporaryPassword");

                signIn(un, pw).then(async (data) => {
                    if(data.stt == "success"){
                        await AsyncStorage.removeItem("shutterbug-emailToVerify");
                        await AsyncStorage.removeItem("shutterbug-temporaryPassword");
                        await AsyncStorage.setItem("shutterbug-sessionData", JSON.stringify(data.data));
                        //console.log(await AsyncStorage.getItem("shutterbug-sessionData"))
                        await AsyncStorage.setItem("shutterbug-app-login-token", data.data.token);
                        setIsLoggedIn(true);
                    }else{
                        setIsLoading(false);
                        setAlertMessage(data.msg[0]);
                        setAlertTitle("OTP Error!!");
                        setAlertType("error");
                        setShowAlert(true);
                    }
                })
            }else{
                setIsLoading(false);
                setAlertMessage(data.msg[0]);
                setAlertTitle("OTP Error!!");
                setAlertType("error");
                setShowAlert(true);
            }
        })
    }

    // for requesting a new otp code after expire
    const requestNewOtp = async () => {
        setIsLoading(true);
        reqNewOtp().then((data) => {
            setIsLoading(false);
            start_timer(data.data.otp_exp);
            setIsVerifyingEmail(true);
            setShowRequestOtp(false);
            setAlertMessage(data.msg[0]);
            setAlertTitle("Check Email");
            setAlertType("success");
            setShowAlert(true);
        })
    }

    if(isLoading){
        return (
            <LoadingScreen />
        )
    }else{
        if(isPasswordForget && !isVerifyingEmail){
            return (
                <Text>He hee</Text>
            )
        }else{
            return (
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                        {(!isVerifyingEmail) ? (
                            <>
                                <View style={styles.textWrapper}>
                                    <Text style={styles.subTextStyle}>welcome to</Text>
                                    <Text style={styles.mainTextStyle}>Shutterbug</Text>
                                    <Text style={styles.normalTextStyle}>Sign In to Continue</Text>
                                </View>
                                <View style={styles.inputWrapper}>
                                    <View style={styles.inputStyle}>    
                                        <Input
                                            keyboardType="default"
                                            value={userName}
                                            onChangeText={(text) => setUserName(text)}
                                            placeholder="Enter Your Email"
                                            icon={<FontAwesome5 name="user" size={20} color={colors.textGray} />}
                                            editable={true}
                                        />
                                    </View>
                                    <View style={styles.inputStyle}>    
                                        <Input
                                            keyboardType="default"
                                            value={password}
                                            onChangeText={(text) => setPassword(text)}
                                            placeholder="Enter Your Password"
                                            icon={<Feather name="lock" size={20} color={colors.textGray} />}
                                            secureTextEntry={secureTextEntry}
                                            editable={true}
                                        />
                                        <Pressable 
                                            style={styles.viewPasswordStyle} 
                                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                                        >
                                            {secureTextEntry ? (<Feather name="eye" size={20} color={colors.textGray} />) : (<Feather name="eye-off" size={20} color={colors.textGray} />)}
                                        </Pressable>
                
                                        <Pressable style={styles.forgotPwStyle} onPress={handleForgotPwClick}>
                                            <Text>Forgot Password?</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={styles.btnWrapper}>
                                    <Button
                                        bgColor = {colors.primary}
                                        content = {<Text style={{color: colors.textLight}}>Sign In</Text>}
                                        func={handleLoginClick}
                                        loading={logInButtonLoading}
                                        loaderIconColor={colors.primaryLight}
                                    />
                                    <Text style={styles.orStyle}>-----------------------  OR  -----------------------</Text>
                                    <Button 
                                        content={
                                            <View style={styles.googleLogoWrapper}>
                                                <Image 
                                                    source={require('../assets/images/common/google-icon.png')} 
                                                    style={styles.googleLogoStyle} 
                                                /> 
                                                <Text style={{color: colors.textGraySecondary}}>Login with Google</Text>
                                            </View>}
                                        func = {handleGoogleClick}
                                        bdr = {colors.textGraySecondary}
                                        paddingStt = {false}
                                    />
                                    <View style={styles.regTextWrapper}>
                                        <Text style={styles.normalTextStyle}>Don't have an Account? </Text>
                                        <Pressable onPress={handleRegClick}><Text style={{fontWeight: 'bold', color: colors.textDark}}>Register</Text></Pressable>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <View style={{paddingHorizontal: 20}}>
                                <Text style={[styles.textCenter, styles.emailVerifyHead]}>Verify Your Email</Text>
                                <Text style={[styles.textCenter, styles.subHeading, {marginBottom: 20}]}>Check your email and enter otp code here</Text>
                                <View style={styles.otpInputWrapper}>
                                    <TextInput 
                                    keyboardType="numeric"
                                    placeholder="Enter OTP Here"
                                    editable={true}
                                    style={styles.otpInputTextStyles}
                                    value={otpValue}
                                    onChangeText={(text) => {setOtpValue(text)}}
                                    />
                                </View>
                                <Button
                                    bgColor = {colors.primary}
                                    content = {<Text style={{color: colors.textLight}}>Verify Email</Text>}
                                    func={veryfyEmail}
                                    style={{ marginTop: 10, width: '100%' }}
                                />

                                <View style={{marginTop: 20}}>
                                    {(showRequestOtp) ?
                                    (
                                        <Pressable onPress={requestNewOtp}><Text style={{color: colors.primaryDark, fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>Request New OTP</Text></Pressable>
                                    ) : (
                                        <Text style={{color: colors.danger, fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>{otpTimeRemaining} Time Remaining</Text>
                                    )
                                    }
                                </View>
                                </View>
                        )}
                        {/* alert window to show sign up alerts */}
                        <Alert type={alertType} title={alertTitle} msg={alertMessage} visible={showAlert} onClose={hideAlert} />
                    </ScrollView>
                </KeyboardAvoidingView>
            );
        }
    }

};

export default SigninScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    textWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTextStyle: {
        fontSize: 32,
        color: colors.textDark,
    },
    mainTextStyle: {
        fontFamily: 'impact-font',
        fontSize: 48,
        color: colors.textDark,
    },
    normalTextStyle: {
        color: colors.textGray,
    },
    inputWrapper: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 20,
    },
    inputStyle: {
        marginBottom: 10,
        width: '100%'
    },
    viewPasswordStyle: {
        position: 'absolute',
        padding: 15,
        right: 0,
        top: 0,
        zIndex: 2,
    },
    forgotPwStyle: {
        alignItems: 'flex-end',
        marginRight: 5,
        marginTop: 5,
    },
    btnWrapper: {
        flex: 1,
    },
    googleLogoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    googleLogoStyle: {
        width: 30,
        resizeMode: 'contain',
        marginRight: 10
    },
    regTextWrapper: {
        flexDirection:'row', 
        justifyContent: 'center', 
        marginTop: 10
    },
    orStyle: {
        paddingVertical:20, 
        textAlign: 'center', 
        color: colors.textGray
    },
    otpInputWrapper: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        overflow: 'scroll',
        justifyContent: 'center',
    },
    otpInputTextStyles: {
        fontSize: 14,
        color: colors.textGraySecondary,
        width: '100%',
        marginHorizontal: 5,
        textAlign: 'center'
    },
    emailVerifyHead: {
        marginBottom: 5,
        fontSize: 25,
        color: colors.textDark,
        fontWeight: 'bold',
        fontFamily: 'popb-font',
        textTransform: 'uppercase'
    },
    textCenter: {
        textAlign: 'center',
    }
});
