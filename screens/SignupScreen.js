import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, Platform, ScrollView, Linking, TextInput, BackHandler, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'
import Input from '../components/general/Input';
import { Feather, FontAwesome5, Fontisto } from '@expo/vector-icons';
import Button from '../components/general/Button';
import Checkbox from '../components/general/Checkbox';
import CustomAlert from '../components/general/Alert';
import { signUp, reqNewOtp, emailVerification, signIn } from '../assets/data/auth';
import LoadingScreen from './LoadingScreen';
import { useAppContext } from '../layouts/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';

const SignupScreen = () => {

  const navigation = useNavigation();
  const { setIsLoggedIn } = useAppContext();

  // form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  //otp states
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [otpTimeRemaining, setOtpTimeRemaining] = useState("0:00");
  const [showRequestOtp, setShowRequestOtp] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  // alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  //for page loading
  const [isLoading, setIsLoading] = useState(true);

  //use effect function
  useEffect(() => {
      setIsLoading(false); 

      const backAction = () => {
        if(isVerifyingEmail){
          Alert.alert('Hold on!', 'Are you sure you want to go back? If you do, you have to verify email when you log in again.', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => navigation.goBack()},
          ]);
          return true;
        }else{
          return false;
        }
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
  
      return () => backHandler.remove();
  }, [isVerifyingEmail]);

  //email validating fuction
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  //when click on sign up button
  const handleSignUp = () => {
    if(password == "" || confPassword == "" || firstName == "" || email == ""){
      setAlertTitle("Error!!");
      setAlertMessage("Please fill all the fields in the form.");
      setShowAlert(true);
      return;
    }

    if(!validateEmail(email)){
      setAlertTitle("Error!!");
      setAlertMessage("Please give a valid email address.");
      setShowAlert(true);
      return;
    }

    if(password !== confPassword){
      setAlertTitle("Error!!");
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
      return;
    }

    // to enable loading
    setIsLoading(true);

    signUp(firstName, lastName, email, password, confPassword).then((data) => {
      if(data.stt == "success"){
        start_timer(data.data.otp_exp);
        setIsVerifyingEmail(true);
      }else{
        setAlertMessage(data.msg[0]);
        setAlertTitle("Error!!");
        setAlertType("error");
        setShowAlert(true);
      }

      // to remove loading
        setTimeout(() => {
          setIsLoading(false);
      }, 100);
    })
  }

  //to navigate to sign in screen
  const gotoSignInScreen = () => {
    navigation.navigate('Sign In');
  }

  //to navigate to sign in screen
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  }

  //to terms of services page
  const redirectToTosPage = () => {
    Linking.openURL('https://google.com'); //change to appropriate link
  }

  //to privacy policy page
  const redirectToPpPage = () => {
    Linking.openURL('https://introps.com'); //change to appropriate link
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
    return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent} 
          showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {(!isVerifyingEmail) ? (
            <>
              <View style={styles.header}>
                <Text style={[styles.textCenter, styles.mainHeading]}>Let's Go!</Text>
                <Text style={[styles.textCenter, styles.subHeading]}>Create an account to continue</Text>
              </View>
              <View style={styles.form}>
                <View style={styles.inputs}>
                  <Input
                      keyboardType="default"
                      value={firstName}
                      onChangeText={(text) => setFirstName(text)}
                      placeholder="Enter Your First Name"
                      icon={<FontAwesome5 name="user" size={20} color={colors.textGray} />}
                      editable={true}
                      borderColor={colors.borderGrayLight}
                  />
                </View>
                <View style={styles.inputs}>
                  <Input
                      keyboardType="default"
                      value={lastName}
                      onChangeText={(text) => setLastName(text)}
                      placeholder="Enter Your Last Name"
                      icon={<FontAwesome5 name="user" size={20} color={colors.textGray} />}
                      editable={true}
                      borderColor={colors.borderGrayLight}
                  />
                </View>
                <View style={styles.inputs}>
                  <Input
                      keyboardType="default"
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                      placeholder="Enter Your Email"
                      icon={<Fontisto name="email" size={20} color={colors.textGray} />}
                      editable={true}
                      borderColor={colors.borderGrayLight}
                  />
                </View>
                <View style={styles.inputs}>
                  <Input
                      keyboardType="default"
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                      placeholder="Enter Your Password"
                      icon={<Feather name="lock" size={20} color={colors.textGray} />}
                      secureTextEntry={secureTextEntry}
                      editable={true}
                      borderColor={colors.borderGrayLight}
                  />
                  <Pressable 
                      style={styles.viewPasswordStyle} 
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                  >
                      {secureTextEntry ? (<Feather name="eye" size={20} color={colors.textGray} />) : (<Feather name="eye-off" size={20} color={colors.textGray} />)}
                  </Pressable>
                </View>
                <View style={styles.inputs}>
                  <Input
                      keyboardType="default"
                      value={confPassword}
                      onChangeText={(text) => setConfPassword(text)}
                      placeholder="Confirm Your Password"
                      icon={<Feather name="lock" size={20} color={colors.textGray} />}
                      secureTextEntry={secureTextEntry2}
                      editable={true}
                      borderColor={colors.borderGrayLight}
                  />
                  <Pressable 
                      style={styles.viewPasswordStyle} 
                      onPress={() => setSecureTextEntry2(!secureTextEntry2)}
                  >
                      {secureTextEntry2 ? (<Feather name="eye" size={20} color={colors.textGray} />) : (<Feather name="eye-off" size={20} color={colors.textGray} />)}
                  </Pressable>
                </View>
                <View style={styles.termsAndConditionsStyles}>
                  <View style={styles.checkBoxContainer}>
                    <Checkbox pressFunc={toggleCheckbox} pressed={isChecked} /> 
                  </View>
                  <View style={styles.policyTextContainer}>
                    <Text style={styles.policyTextStyle}>By signing up, you agree to the </Text> 
                    <Pressable onPress={redirectToTosPage}>
                      <Text style={[styles.policyTextStyle, {color: colors.primary, fontWeight: 'bold'}]}>Terms of services</Text>
                    </Pressable>
                    <Text style={styles.policyTextStyle}> and </Text> 
                    <Pressable onPress={redirectToPpPage}>
                      <Text style={[styles.policyTextStyle, {color: colors.primary, fontWeight: 'bold'}]}>Privacy policy.</Text>
                    </Pressable>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                      bgColor = {colors.primary}
                      content = {<Text style={{color: colors.textLight}}>Sign Up</Text>}
                      func={handleSignUp}
                      btnDisabled={!isChecked}
                      errorMessage="Please agree to Terms of services and Privacy policy."
                  />
                </View>
                <View style={styles.signInSection}>
                  <Text style={{color: colors.textGraySecondary}}>
                    Already have an account?
                  </Text>
                  <View style={{marginLeft: 5}}>
                    <Pressable onPress={gotoSignInScreen}>
                      <Text style={{fontWeight: 'bold', color: colors.textDark}}>Sign In</Text>
                    </Pressable>
                  </View>
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
          <CustomAlert type={alertType} title={alertTitle} msg={alertMessage} visible={showAlert} onClose={hideAlert} />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  textCenter:{
    textAlign: 'center',
  },
  header: {
    marginBottom: 40
  },
  mainHeading: {
    marginBottom: 3,
    fontFamily: 'impact-font',
    fontSize: 35,
    color: colors.textDark,
  },
  subHeading: {
    color: colors.textGraySecondary
  },
  form: {
    paddingHorizontal: 20,
  },
  inputs: {
    marginBottom: 15,
  },
  viewPasswordStyle: {
    position: 'absolute',
    padding: 15,
    right: 0,
    top: 0,
    zIndex: 2,
  },
  buttonContainer: {
    marginBottom: 15,
  },
  signInSection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  termsAndConditionsStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  checkBoxContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  policyTextContainer: {
    flex: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap', 
  },
  policyTextStyle: {
    flexWrap: 'wrap', 
    fontSize: 12, 
    color: colors.textGraySecondary,
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
})