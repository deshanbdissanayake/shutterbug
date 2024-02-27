import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import colors from '../assets/colors/colors';
import Button from '../components/general/Button';
import Input from '../components/general/Input';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import FormErrorMsg from '../components/general/FormErrorMsg';

const SigninScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleLoginClick = async () => {
        /*
        if (!userName) {
            setErrorMsg('Please enter your username.');
            return;
        }
    
        if (userName.length < 3) {
            setErrorMsg('Username must be at least 3 characters long.');
            return;
        }

        if (!password && password.length < 6) {
            setErrorMsg('Please enter a correct password.');
            return;
        }

        // Add any further validation for the password if needed
        setErrorMsg('');
        */
       navigation.navigate('Client')
    };

    const handleForgotPwClick = () => {
        //add function to redirect to forgot password
    }

    const handleGoogleClick = () => {
        //add function to redirect to google login
    }

    const handleRegClick = () => {
        navigation.navigate('Sign Up');
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
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
                            placeholder="Enter Your Username"
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

                        <Pressable style={styles.forgotPwStyle} onPress={handleForgotPwClick()}>
                            <Text>Forgot Password ?</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.btnWrapper}>
                    {errorMsg !== '' && (
                        <FormErrorMsg msg={errorMsg} />
                    )}
                    <Button
                        bgColor = {colors.primary}
                        content = {<Text style={{color: colors.textLight}}>Sign In</Text>}
                        func={handleLoginClick}
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
                        <Text style={styles.normalTextStyle}>Don't have an Account ? </Text>
                        <Pressable onPress={handleRegClick}><Text>Register</Text></Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
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
