import { StyleSheet, Text, View, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import colors from '../assets/colors/colors'
import { useNavigation } from '@react-navigation/native'
import Input from '../components/general/Input';
import { Feather, FontAwesome5, Fontisto } from '@expo/vector-icons';
import Button from '../components/general/Button';

const SignupScreen = () => {

  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  //when click on sign up button
  const handleSignUp = () => {
    navigation.navigate('Client Main');
  }

  //to navigate to sign in screen
  const gotoSignInScreen = () => {
    navigation.navigate('Sign In');
  }

  //to navigate to sign in screen
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  }

  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
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
          <View style={styles.buttonContainer}>
            <Button
                bgColor = {colors.primary}
                content = {<Text style={{color: colors.textLight}}>Sign Up</Text>}
                func={handleSignUp}
            />
          </View>
          <View style={styles.signInSection}>
            <Text style={{color: colors.textGraySecondary}}>
              Already have an account?
            </Text>
            <View style={{marginLeft: 5}}>
              <Pressable onPress={gotoSignInScreen}>
                <Text style={{fontWeight: 'bold', color: colors.primaryDark}}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
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
  }
})