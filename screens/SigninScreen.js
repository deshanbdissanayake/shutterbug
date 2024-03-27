import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, Pressable, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../assets/colors/colors';
import Button from '../components/general/Button';
import Input from '../components/general/Input';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import Alert from '../components/general/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn, forgotPassword } from '../assets/data/auth';
import { useAppContext } from '../layouts/AppContext';
import LoadingScreen from './LoadingScreen';

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

    //useeffect function
    useEffect(() => {
        setIsLoading(false);
    }, []);

    const setToken = async (token) => {
        try{
            await AsyncStorage.setItem("shutterbug-app-login-token", token);
            return true;
        }catch(error){
            return false;
        }
    }

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
                setToken(data["data"].token).then((res) => {
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

                setAlertMessage(data.msg[0]);
                setAlertTitle(<Text style={{textTransform: "capitalize"}}>{data.stt}!!</Text>);
                setAlertType(data.stt);
                setShowAlert(true);
            }
        })
    };

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
                setAlertTitle("Email Sent");
                setAlertMessage(res.msg[0]);
                setAlertType("success");
                setShowAlert(true);
                // hide alert window after 1.5s if user doesn't close
                setTimeout(function(){
                    hideAlert();
                    // should navigate to otp code entering section and enter new password section
                }, 3000);
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
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
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
                    {/* alert window to show sign up alerts */}
                    <Alert type={alertType} title={alertTitle} msg={alertMessage} visible={showAlert} onClose={hideAlert} />
                </ScrollView>
            </KeyboardAvoidingView>
        );
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
    }
});
