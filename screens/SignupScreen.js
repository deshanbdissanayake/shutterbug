import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, Platform, ScrollView, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'
import Input from '../components/general/Input';
import { Feather, FontAwesome5, Fontisto } from '@expo/vector-icons';
import Button from '../components/general/Button';
import Checkbox from '../components/general/Checkbox';
import Alert from '../components/general/Alert';
import { signUp } from '../assets/data/auth';
import LoadingScreen from './LoadingScreen';

const SignupScreen = () => {

  const navigation = useNavigation();

  // form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  // alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  //for page loading
  const [isLoading, setIsLoading] = useState(true);

  //useeffect function
  useEffect(() => {
      setIsLoading(false); 
  }, []);

  //email validating fuction
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  //when click on sign up button
  const handleSignUp = () => {
    if(password == "" || confPassword == "" || fullName == "" || email == ""){
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

    signUp(fullName, email, password, confPassword).then((data) => {
      if(data.status == "success"){
        setAlertMessage(data.message[0]);
        setAlertTitle("Success!!");
        setAlertType("success");
        setSignUpSuccess(true);
        setShowAlert(true);
      }else{
        setAlertMessage(data.message[0]);
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
    //if signup is complete
    if(signUpSuccess === true){
      setFullName("");
      setEmail("");
      setPassword("");
      setConfPassword("");
      setIsChecked(false);
      setSecureTextEntry(true);
      setSecureTextEntry2(true);
      setSignUpSuccess(false);
      navigation.navigate('Sign In');
    }
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
          <View style={styles.header}>
            <Text style={[styles.textCenter, styles.mainHeading]}>Let's Go!</Text>
            <Text style={[styles.textCenter, styles.subHeading]}>Create an account to continue</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputs}>
              <Input
                  keyboardType="default"
                  value={fullName}
                  onChangeText={(text) => setFullName(text)}
                  placeholder="Enter Your Full Name"
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
          {/* alert window to show sign up alerts */}
          <Alert type={alertType} title={alertTitle} msg={alertMessage} visible={showAlert} onClose={hideAlert} />
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
    alignItems: 'center',
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
  }
})